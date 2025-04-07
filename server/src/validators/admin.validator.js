import joi from "joi";

const approveUserSchema = {
  body: joi.object().keys({
    id: joi.string().required(),
  }),
};

const users = {
  query: joi.object().keys({
    role: joi.string().valid("farmer", "expert", "vendor").required(),
    isApproved: joi.boolean().valid(true, false).required(),
  }),
};

export default { approveUserSchema, users };
