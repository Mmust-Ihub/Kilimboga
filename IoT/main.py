from machine import Pin, ADC, UART
import urequests as requests
import onewire, ds18x20
import network
import time
import dht

# Firebase Configuration
FIREBASE_PROJECT_ID = "kimboga-46a89"
FIREBASE_COLLECTION = "devices"
FIREBASE_DOCUMENT = "Q3IH0"
FIREBASE_URL = f"https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/databases/(default)/documents/{FIREBASE_COLLECTION}/{FIREBASE_DOCUMENT}"
API_KEY = "AIzaSyBxZTbtgV3kDosikGKn3p7XZAf8yW_fEKA"
HEADERS = {"Content-Type": "application/json"}

# Wi-Fi Credentials
SSID = "Seb"
PASSWORD = "MLDSebbie23AI"

# RS485 transceiver control pins
DE_PIN = Pin(2, Pin.OUT)
RE_PIN = Pin(2, Pin.OUT)
ds_pin = Pin(32)
fan_pin = Pin(27, Pin.OUT)
humidifier_pin = Pin(13,Pin.OUT)
pump_pin = Pin(2,Pin.OUT)

localhumdififier = False


# Initialize OneWire & DS18B20 sensor
ow = onewire.OneWire(ds_pin)
ds = ds18x20.DS18X20(ow)

# UART for RS485 communication
UART_NUM = 2
TX_PIN = 17
RX_PIN = 16
uart = UART(UART_NUM, baudrate=9600, tx=TX_PIN, rx=RX_PIN, timeout=100)

# DHT11 Sensor (Air Temp & Humidity) on GPIO 14
dht_sensor = dht.DHT11(Pin(14))

# Initialize LDR on GPIO 34
ldr = ADC(Pin(34))
ldr.atten(ADC.ATTN_11DB)  # Full range (0 - 3.3V)

# RS485 Commands
NITRO_CMD = bytes([0x01, 0x03, 0x00, 0x1E, 0x00, 0x01, 0xE4, 0x0C])
PHOSP_CMD = bytes([0x01, 0x03, 0x00, 0x1F, 0x00, 0x01, 0xB5, 0xCC])
POTAS_CMD = bytes([0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xC0])
EC_CMD = bytes([0x01, 0x03, 0x00, 0x15, 0x00, 0x01, 0x95, 0xCE])
PH_CMD = bytes([0x01, 0x03, 0x00, 0x06, 0x00, 0x01, 0x64, 0x0B])

roms = ds.scan()
print("Found DS18B20 devices:", roms)

# Wi-Fi Connection
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(SSID, PASSWORD)
    while not wlan.isconnected():
        print("Connecting to Wi-Fi...")
        time.sleep(1)
    print("Connected!", wlan.ifconfig())

connect_wifi()

def ensure_wifi():
    wlan = network.WLAN(network.STA_IF)
    if not wlan.isconnected():
        print("Wi-Fi lost, reconnecting...")
        connect_wifi()

# Fetch data from Firebase
def get_data(path):
    url = f"{FIREBASE_URL}{path}"
    try:
        response = requests.get(url)
        print("Firestore Raw Response:", response.text)  # Debugging line
        return response.json() if response.status_code == 200 else None
    except Exception as e:
        print("Firestore Request Error:", str(e))
        return None
def togglehumidifier():
    global localhumdififier
    if not localhumdififier:
        humidifier_pin.off()

        localhumdififier = True
    else :
        humidifier_pin.on()
        localhumdififier = False


# Send data to Firebase
def send_to_firestore(data):
    url = FIREBASE_URL
    payload = {
        "fields": {
            "stats": {
                "mapValue": {
                    "fields": {
                        key: {"doubleValue": value} if isinstance(value, (int, float)) 
                        else {"stringValue": str(value)}
                        for key, value in data["stats"].items()
                    }
                }
            },
            "controls": {
                "mapValue": {
                    "fields": {
                        "fan_state": {"booleanValue": data["controls"]["fan_state"]},
                        "pump_state": {"booleanValue": data["controls"]["pump_state"]},
                        "humidifier_state": {"booleanValue": data["controls"]["humidifier_state"]}
                    }
                }
            }
        }
    }

    try:
        response = requests.patch(url, json=payload, headers=HEADERS)
        print("Firestore Update:", response.json())
    except Exception as e:
        print("Firestore Error:", str(e))

# RS485 Communication
def send_request(command, label):
    print(f"reading {label}")
    DE_PIN.on()
    RE_PIN.on()
    time.sleep(0.01)
    uart.write(command)
    time.sleep(0.1)
    DE_PIN.off()
    RE_PIN.off()
    response = uart.read()
    if response and len(response) >= 5:
        return (response[3] << 8) | response[4] if label == "Temperature" else response[3]
    return 0

# Read DS18B20 Soil Temperature
def read_temperature():
    ds.convert_temp()
    time.sleep_ms(750)
    return ds.read_temp(roms[0]) if roms else 0

# Read DHT11
def read_dht11():
    try:
        dht_sensor.measure()
        return dht_sensor.temperature(), dht_sensor.humidity()
    except:
        return 0, 0

# Fan Control
def control_fan(temp):
    if temp > 40:
        fan_pin.off()
        print("Fan ON")
        fan_control = True
        return True
    else:
        fan_pin.on()
        print("Threshold not met")
        return False
    
def control_humidifier(humid):
    if humid < 35:
        if not localhumdififier:
            togglehumidifier()
            print("Humidifier ON")
        humidifier_control = True
        return True
    else:
        if localhumdififier:
            togglehumidifier()
        humidifier_control = False
        print("Threshold not met")
        return False
    
def control_pump(moist):
    if moist < 20:
        pump_pin.off()
        print("Pump ON")
        pump_control = True
        return True
    else:
        pump_pin.on()
        pump_control = False
        print("Pump Threshold not met")
        return False

# Function to read light intensity
def read_light():
    return ldr.read()  # Returns a value between 0-4095
def ctrl(fan_state,humidifier_state,pump_state):
    print("Making controls")
    if fan_state:
        fan_pin.off()
        print("Fan ON")
        
    else :
        fan_pin.on()
        print("Threshold not met")
    
    if humidifier_state:
        print(f"Humidifier state {humidifier_state}")
        if not localhumdififier:
            togglehumidifier()
            print("Humidifier ON")
            humidifier_control = True
    else :
        if localhumdififier:
            togglehumidifier()
        humidifier_control = False
        print("Humififier off")
    
    if pump_state:
        pump_pin.off()
        print("pump ON")
        
    else :
        pump_pin.on()
        print("Threshold not met")

# Main Loop
# Track last fan state to avoid redundant updates
last_fan_state = None

while True:
    ensure_wifi()
    check_temp = lambda soil_temp: soil_temp < 40
   

    # Fetch controls from Firestore
    control_data = get_data("")
    if control_data and "fields" in control_data:
        fan_control = (
            control_data.get("fields", {})
            .get("controls", {})
            .get("mapValue", {})
            .get("fields", {})
            .get("fan_state", {})
            .get("booleanValue", False)
        )
        humidifier_control = (
            control_data.get("fields", {})
            .get("controls", {})
            .get("mapValue", {})
            .get("fields", {})
            .get("humidifier_state", {})
            .get("booleanValue", False)
        )
        pump_control = (
            control_data.get("fields", {})
            .get("controls", {})
            .get("mapValue", {})
            .get("fields", {})
            .get("pump_state", {})
            .get("booleanValue", False)
        )
        print(f"Firestore fan_control {fan_control}")
        print(f"Firestore pump_control {pump_control}")
        print(f"Firestore humidifier_control {humidifier_control}")
        ctrl(fan_control,humidifier_control,pump_control)
    else:
        print("Error: controls_data")
        fan_control = False
        humidifier_control = False
        pump_control = False
        ctrl(fan_control,humidifier_control,pump_control)

    # Sensor readings
    nitro_value = send_request(NITRO_CMD, "Nitrogen")
    phosp_value = send_request(PHOSP_CMD, "Phosphorus")
    potas_value = send_request(POTAS_CMD, "Potassium")
    ec_value = send_request(EC_CMD, "Conductivity")
    ph_value = send_request(PH_CMD, "pH")
    air_temp, air_humidity = read_dht11()
    soil_temp = read_temperature()
    light_value = read_light()
    
    if not fan_control:
        fan_control = control_fan(soil_temp)
    if not humidifier_control:
        humidifier_control = control_humidifier(air_humidity)
    if not pump_control:
        pump_control = control_pump(ec_value)
    

    sensor_data = {
            "controls": {
                "fan_state": fan_control,
                "pump_state": False,
                "humidifier_state": humidifier_control
                },
            "stats": {
            "nitrogen": nitro_value,
            "phosphorus": phosp_value,
            "potassium": potas_value,
            "ec": ec_value,
            "pH": ph_value,
            "air_temp": soil_temp,
            "humidity": air_humidity,
            "soil_temp": soil_temp,
            "ambient_light": light_value
            }
        }
    # Update stats every cycle
    print("Sending data")
    send_to_firestore(sensor_data)
  
    
    time.sleep(2)  # Avoid excessive requests




# v2
#include <WiFi.h>
#include <HTTPClient.h>
#include <OneWire.h>            // Make sure this is installed
#include <DallasTemperature.h>  // Make sure this is installed

/* ============== Config ============== */
const char* WIFI_SSID = "calvoh";
const char* WIFI_PASS = "ShotGGGG";

String FIREBASE_PROJECT_ID = "kimboga-46a89";
String FIREBASE_COLLECTION = "devices";
String FIREBASE_DOCUMENT = "Q3IH0";
String FIREBASE_URL = "https://firestore.googleapis.com/v1/projects/" + FIREBASE_PROJECT_ID +
                      "/databases/(default)/documents/" + FIREBASE_COLLECTION + "/" + FIREBASE_DOCUMENT;

/* ============== Pins ============== */
#define DE_PIN        2   
#define RE_PIN        4   
#define RS485_RX_PIN  22
#define RS485_TX_PIN  19 

#define DS18B20_PIN   14  // Temp Sensor
#define MOISTURE_PIN  35  // Capacitive Sensor
#define FAN_PIN       21
#define HUMIDIFIER_PIN 13
#define PUMP_PIN      23

/* ============== Objects ============== */
OneWire oneWire(DS18B20_PIN);
DallasTemperature sensors(&oneWire);

/* ============== State ============== */
bool localHumidifier = false;

// RS485 Commands
const uint8_t NITRO_CMD[]  = {0x01,0x03,0x00,0x1E,0x00,0x01,0xE4,0x0C};
const uint8_t PHOSP_CMD[]  = {0x01,0x03,0x00,0x1F,0x00,0x01,0xB5,0xCC};
const uint8_t POTAS_CMD[]  = {0x01,0x03,0x00,0x20,0x00,0x01,0x85,0xC0};
const uint8_t EC_CMD[]     = {0x01,0x03,0x00,0x15,0x00,0x01,0x95,0xCE};
const uint8_t PH_CMD[]     = {0x01,0x03,0x00,0x06,0x00,0x01,0x64,0x0B};

/* ============== Helpers ============== */

// Helper to find boolean values in messy JSON
bool extractBool(String json, String fieldName) {
  int keyPos = json.indexOf("\"" + fieldName + "\"");
  if (keyPos == -1) return false; // Key not found
  
  // Look for "booleanValue" after the key
  int boolKeyPos = json.indexOf("booleanValue", keyPos);
  if (boolKeyPos == -1) return false;

  // Look for "true" or "false" after booleanValue
  int truePos = json.indexOf("true", boolKeyPos);
  int falsePos = json.indexOf("false", boolKeyPos);
  
  // Determine which comes first (ignoring -1)
  if (truePos != -1) {
    // If 'true' is found, and (false is not found OR true is closer than false)
    if (falsePos == -1 || truePos < falsePos) {
       // Ensure it's part of THIS field (simple proximity check, <50 chars away)
       if (truePos - boolKeyPos < 50) return true;
    }
  }
  return false;
}

int read_rs485(const uint8_t *cmd, size_t len, String label) {
  while(Serial2.available()) Serial2.read(); // Clear buffer
  
  digitalWrite(DE_PIN, HIGH);
  delay(10);
  Serial2.write(cmd, len);
  Serial2.flush(); 
  digitalWrite(DE_PIN, LOW);
  
  uint8_t buf[10];
  unsigned long start = millis();
  int idx = 0;
  while (millis() - start < 300) {
    if (Serial2.available()) {
      buf[idx++] = Serial2.read();
      if (idx >= 7) break; 
    }
  }

  if (idx >= 5) {
    if (label == "Temperature" || true) return (buf[3] << 8) | buf[4];
    return buf[3];
  }
  return 0;
}

int read_moisture() {
  int raw = analogRead(MOISTURE_PIN);
  int air_val = 3000;
  int water_val = 1200;
  if (raw > air_val) raw = air_val;
  if (raw < water_val) raw = water_val;
  return map(raw, water_val, air_val, 100, 0); 
}

void toggle_humidifier() {
  if (!localHumidifier) {
    digitalWrite(HUMIDIFIER_PIN, LOW); 
    localHumidifier = true;
  } else {
    digitalWrite(HUMIDIFIER_PIN, HIGH);
    localHumidifier = false;
  }
}

/* ============== Setup ============== */
void setup() {
  Serial.begin(115200);
  sensors.begin(); // Start Temp Sensor Library

  pinMode(DE_PIN, OUTPUT); digitalWrite(DE_PIN, LOW);
  
  // Set Relays to OFF (HIGH) initially
  pinMode(FAN_PIN, OUTPUT); digitalWrite(FAN_PIN, HIGH);
  pinMode(HUMIDIFIER_PIN, OUTPUT); digitalWrite(HUMIDIFIER_PIN, HIGH);
  pinMode(PUMP_PIN, OUTPUT); digitalWrite(PUMP_PIN, HIGH);

  Serial2.begin(9600, SERIAL_8N1, RS485_RX_PIN, RS485_TX_PIN);

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected!");
}

/* ============== Main Loop ============== */
void loop() {
  bool fan_ctrl = false;
  bool pump_ctrl = false;
  bool humid_ctrl = false;
  
  // 1. GET Controls from Firebase
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(FIREBASE_URL);
    int httpCode = http.GET();
    if (httpCode == 200) {
      String payload = http.getString();
      // Use the new Robust Parser
      fan_ctrl   = extractBool(payload, "fan_state");
      pump_ctrl  = extractBool(payload, "pump_state");
      humid_ctrl = extractBool(payload, "humidifier_state");
      
      Serial.print("APP STATE -> Fan: "); Serial.print(fan_ctrl);
      Serial.print(" | Pump: "); Serial.println(pump_ctrl);
    }
    http.end();
  }

  // 2. Apply Manual Overrides
  // Note: Relay logic assumes LOW = ON, HIGH = OFF
  digitalWrite(FAN_PIN, fan_ctrl ? LOW : HIGH);
  digitalWrite(PUMP_PIN, pump_ctrl ? LOW : HIGH);
  
  if (humid_ctrl && !localHumidifier) toggle_humidifier();
  else if (!humid_ctrl && localHumidifier) toggle_humidifier();

  // 3. Read Sensors
  int nitro = read_rs485(NITRO_CMD, sizeof(NITRO_CMD), "Nitrogen");
  int phosp = read_rs485(PHOSP_CMD, sizeof(PHOSP_CMD), "Phosphorus");
  int potas = read_rs485(POTAS_CMD, sizeof(POTAS_CMD), "Potassium");
  int ec    = read_rs485(EC_CMD, sizeof(EC_CMD), "Conductivity");
  int ph    = read_rs485(PH_CMD, sizeof(PH_CMD), "pH");
  
  sensors.requestTemperatures(); 
  float soil_temp = sensors.getTempCByIndex(0);
  if(soil_temp == -127.00) soil_temp = 0.0; // Error handling

  int moisture_pct = read_moisture();
  
  Serial.printf("Sensors -> Temp: %.2f | Moist: %d%%\n", soil_temp, moisture_pct);

  // 4. Automatic Logic (Only runs if Manual is OFF)
  if (!fan_ctrl) {
    if (soil_temp > 40) digitalWrite(FAN_PIN, LOW); // ON
    else digitalWrite(FAN_PIN, HIGH); // OFF
  }
  
  if (!pump_ctrl) {
    if (moisture_pct < 20) digitalWrite(PUMP_PIN, LOW); // ON
    else digitalWrite(PUMP_PIN, HIGH); // OFF
  }

  // 5. Send Data to Firebase
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(FIREBASE_URL + "?updateMask.fieldPaths=stats&updateMask.fieldPaths=controls");
    http.addHeader("Content-Type", "application/json");

    // We report back exactly what the controls are set to (to sync UI)
    String json = "{ \"fields\": { \"stats\": { \"mapValue\": { \"fields\": {";
    json += "\"nitrogen\": { \"doubleValue\": " + String(nitro) + " },";
    json += "\"phosphorus\": { \"doubleValue\": " + String(phosp) + " },";
    json += "\"potassium\": { \"doubleValue\": " + String(potas) + " },";
    json += "\"ec\": { \"doubleValue\": " + String(ec) + " },";
    json += "\"pH\": { \"doubleValue\": " + String(ph) + " },";
    json += "\"soil_temp\": { \"doubleValue\": " + String(soil_temp) + " },";
    json += "\"soil_moisture\": { \"doubleValue\": " + String(moisture_pct) + " },";
    json += "\"air_temp\": { \"doubleValue\": 0 },";
    json += "\"humidity\": { \"doubleValue\": 0 },";
    json += "\"ambient_light\": { \"doubleValue\": 0 }";
    json += "} } }, \"controls\": { \"mapValue\": { \"fields\": {";
    json += "\"fan_state\": { \"booleanValue\": " + String(fan_ctrl ? "true" : "false") + " },";
    json += "\"pump_state\": { \"booleanValue\": " + String(pump_ctrl ? "true" : "false") + " },";
    json += "\"humidifier_state\": { \"booleanValue\": " + String(humid_ctrl ? "true" : "false") + " }";
    json += "} } } } }";

    int httpResponseCode = http.PATCH(json);
    http.end();
  }

  delay(2000);
}
