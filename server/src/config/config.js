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
};
