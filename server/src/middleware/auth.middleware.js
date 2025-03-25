import { rateLimit } from "express-rate-limit";
import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import config from "../config/config.js";
import { ApiError } from "../utils/APiError.js";

export const authLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    skipSuccessfulRequests: true,
})

export const authorize = (roles) => {
    if(typeof roles === "string"){
        roles = [roles]
    }
    return (req, res, next) => {
        if (!req.user){
            return res.status(401).json({"failed": "Unauthorized"})
        }
        if (roles.length && !roles.includes(req.user.role)){
            return res.status(403).json({"failed": "You do not have permission to perform this action"})
        }
        next()
    }

}

export const authenticate = catchAsync(async (req, res, next) => {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, "authentication headers required.");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "missing authorization token");
    }
    jwt.verify(token, config.jwt.secret, async(error, payload) => {
      if (error) {
        if (error.name === "JsonWebToken") {
          throw new ApiError(401, "invalid jwt token");
        } else {
          throw new ApiError(401, error.message);
        }
      }
      const user = await userModel.findById(payload.aud);
        if (!user) {
          throw new ApiError(401, "User not found");
        }
      req.user = user;
      next();
    });
  });