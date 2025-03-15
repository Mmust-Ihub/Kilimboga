import joi from "joi";

const registerUserSchema = {
  body: joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email(),
    password: joi.string().min(6).required(),
    phoneNumber: joi.string().min(10).required(),
    longitude: joi.string().required(),
    latitude: joi.string().required(),
    isSpecial: joi.boolean().default(false),
  }),
};

const verifyAccountSchema = {
  body: joi.object().keys({
    authCode: joi.string().required(),
  }),
};

const loginSchema = {
  body: joi.object().keys({
    email: joi.string().required().email(),
    password: joi.string().required(),
  }),
};

export default { registerUserSchema, verifyAccountSchema, loginSchema };
