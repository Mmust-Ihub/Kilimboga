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