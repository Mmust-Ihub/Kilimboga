import joi from "joi";

const addProductSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    category: joi
      .string()
      .valid("fertilizers", "seeds", "tools", "pesticides")
      .required(),
    price: joi.number().required(),
    quantity: joi.number().required(),
  }),
};

const getOrders = {
  query: joi.object().keys({
    state: joi.string().valid("pending", "delivered").required()
  }),
};

export default { addProductSchema, getOrders };
