import joi from "joi";

const AddGreenHouseSchema = {
  body: joi.object().keys({
    name: joi.string().required(),
    plant: joi.string().required(),
    location: joi.object({
      type: joi.string().default("Point"),
      coordinates: joi.array().length(2).required(),
    }),
  }),
};

const predictSchema = {
  query: joi.object().keys({
    type: joi.string().valid("pest", "disease").required()
  }),
  body: joi.object().keys({
    farmId: joi.string().required(),
  })
};

const connect = {
  body: joi.object().keys({
    "imageUrl": joi.string().required(),
    "_id": joi.string().required()
  })
}

const products = {
  query: joi.object().keys({
    category: joi.string().valid("fertilizers", "seeds", "tools", "pesticides").optional()
  })
}

export default { AddGreenHouseSchema, predictSchema, connect, products };
