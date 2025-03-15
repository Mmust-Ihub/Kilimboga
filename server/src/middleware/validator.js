import joi from "joi"
import httpStatus from "http-status"
import { allowList } from "../utils/utils.js"
import { ApiError } from "../utils/APiError.js";

export const validate = (schema) => (req, res, next) => {
    const validSchema = allowList(schema, ['params', 'query', 'body']);
    const object = allowList(req, Object.keys(validSchema));
    const { value, error } = joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);
    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };