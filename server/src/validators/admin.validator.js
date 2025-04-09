import joi from "joi";

const approveUserSchema = {
  query: joi.object().keys({
    action: joi.string().valid("approve", "suspend", "restore").required()
  }),
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
