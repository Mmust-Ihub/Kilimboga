import joi from "joi";

const approveUserSchema = {
  body: joi.object().keys({
    id: joi.string().required(),
  }),
};

export default { approveUserSchema };
