import { config } from "dotenv";
import path, { dirname } from "path";
import joi from "joi";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("production", "development", "testing")
      .required(),
    PORT: joi.number().default(3000),
    AUTH_CODE_LENGTH: joi.number().required().description("Authentication code length."),
    // mail
    MAIL_USERNAME: joi.string().required().description("Email username "),
    MAIL_PASSWORD: joi.string().required().description("Email password "),
    // admin
    ADMIN_FIRST_NAME: joi.string().required().description("Admin first name"),
    ADMIN_LAST_NAME: joi.string().required().description("Admin last name"),
    ADMIN_EMAIL: joi.string().required().description("Admin email address"),
    ADMIN_PASSWORD: joi.string().required().description("Admin password"),
    ADMIN_PHONE_NUMBER: joi.string().required().description("Admin phone number"),
    ADMIN_AUTH_CODE: joi.string().required().description("Admin phone number"),
    // mongodb
    MONGODB_URL: joi.string().required().description("MongoDB url"),
    MONGODB_NAME: joi.string().required().description("MongoDB name"),
    JWT_SECRET: joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_SECONDS: joi
      .number()
      .default(30)
      .description("minutes after which access tokens expire"),
    // cloudinary
    CLOUDINARY_CLOUD_NAME: joi.string().required().description("Cloudinary cloud name"),
    CLOUDINARY_API_KEY: joi.string().required().description("Cloudinary api key"),
    CLOUDINARY_API_SECRET: joi.string().required().description("Cloudinary api secret"),
    // gemini
    GEMINI_API_KEY: joi.string().required().description("Gemini api key"),
    GEMINI_MODEL: joi.string().required().description("Gemini model"),
    // vet
    MAX_VET_DISTANCE: joi.string().required().description("The maximum veterinary"),
    MAX_VET_LIMIT: joi.string().required().description("The maximum veterinary limit"),
    // mpesa
    MPESA_BASE_URL: joi.string().required().description("Mpesa base url"),
    MPESA_CONSUMER_KEY: joi.string().required().description("Mpesa consumer key"),
    MPESA_CONSUMER_SECRET: joi.string().required().description("Mpesa consumer secret"),
    MPESA_PASS_KEY: joi.string().required().description("Mpesa pass key"),
    MPESA_SHORT_CODE: joi.string().required().description("Mpesa shortcode"),
    MPESA_TRANSACTION_TYPE: joi.string().required().description("Mpesa transaction type"),
    MPESA_CALLBACK_BASE_URL: joi.string().required().description("Mpesa callback base url"),
    // firebase
    FIREBASE_TYPE: joi.string().required().description("Firebase type"),
    FIREBASE_PROJECT_ID: joi.string().required().description("Firebase project id"),
    FIREBASE_PRIVATE_KEY_ID: joi.string().required().description("Firebase private key id"),
    FIREBASE_PRIVATE_KEY: joi.string().required().description("Firebase private key"),
    FIREBASE_CLIENT_EMAIL: joi.string().required().description("Firebase client email"),
    FIREBASE_CLIENT_ID: joi.string().required().description("Firebase client id"),
    FIREBASE_AUTH_URI: joi.string().required().description("Firebase auth uri"),
    FIREBASE_TOKEN_URI: joi.string().required().description("Firebase token uri"),
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: joi.string().required().description("Firebase auth provider cert url"),
    FIREBASE_CLIENT_X509_CERT_URL: joi.string().required().description("Firebase client cert url"),
    FIREBASE_UNIVERSE_DOMAIN: joi.string().required().description("Firebase universe domain"),
    FIREBASE_EXPERT_COLL: joi.string().required().description("Firebase expert collection"),
    FIREBASE_IOT_COLL: joi.string().required().description("Firebase iot collection"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  auth: {
    length: envVars.AUTH_CODE_LENGTH
  },
  mongoose: {
    url: envVars.MONGODB_URL,
    name: envVars.MONGODB_NAME,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationSeconds: envVars.JWT_ACCESS_EXPIRATION_SECONDS,
  },
  mail: {
    username: envVars.MAIL_USERNAME,
    password: envVars.MAIL_PASSWORD
  },
  admin: {
    firstName: envVars.ADMIN_FIRST_NAME,
    lastName: envVars.ADMIN_LAST_NAME,
    email: envVars.ADMIN_EMAIL,
    password: envVars.ADMIN_PASSWORD,
    phoneNumber: envVars.ADMIN_PHONE_NUMBER,
    authCode: envVars.ADMIN_AUTH_CODE,
    location: {
      coordinates: [34.75229, 0.28422]
    },
  },
  cloudinary: {
    name: envVars.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY_API_SECRET
  },
  gemini: {
    api_key: envVars.GEMINI_API_KEY,
    model: envVars.GEMINI_MODEL
  },
  vet: {
    distance: envVars.MAX_VET_DISTANCE,
    limit: envVars.MAX_VET_LIMIT,
    coll: envVars.FIREBASE_COLL
  },
  mpesa: {
    base_url: envVars.MPESA_BASE_URL,
    consumer_key: envVars.MPESA_CONSUMER_KEY,
    consumer_secret: envVars.MPESA_CONSUMER_SECRET,
    pass_key: envVars.MPESA_PASS_KEY,
    short_code: envVars.MPESA_SHORT_CODE,
    transaction_type: envVars.MPESA_TRANSACTION_TYPE,
    callback_url: envVars.MPESA_CALLBACK_BASE_URL,
  },
  firebase: {
    expert_coll: envVars.FIREBASE_EXPERT_COLL,
    iot_coll: envVars.FIREBASE_IOT_COLL,
    cfg: {
      type: envVars.FIREBASE_TYPE,
      project_id: envVars.FIREBASE_PROJECT_ID,
      private_key_id: envVars.FIREBASE_PRIVATE_KEY_ID,
      private_key: envVars.FIREBASE_PRIVATE_KEY,
      client_email: envVars.FIREBASE_CLIENT_EMAIL,
      client_id: envVars.FIREBASE_CLIENT_ID,
      auth_uri: envVars.FIREBASE_AUTH_URI,
      token_uri: envVars.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: envVars.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: envVars.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: envVars.FIREBASE_UNIVERSE_DOMAIN,
    }
  }
};
