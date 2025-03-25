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
};

const connect = {
  body: joi.object().keys({
    "imageUrl": joi.string().required(),
    "_id": joi.string().required()
  })
}

export default { AddGreenHouseSchema, predictSchema, connect };
