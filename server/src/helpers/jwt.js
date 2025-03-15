import jwt from "jsonwebtoken"
import config from "../config/config.js";

export const generateAccessToken = async (data) => {
    return new Promise((resolve, reject) => {
      const payload = {
        email: data.email,
        role: data.role
      };
      const expire_time = config.jwt.accessExpirationSeconds;
      const options = {
        expiresIn: expire_time,
        audience: data.id,
        issuer: "application",
      };
      jwt.sign(payload, config.jwt.secret, options, (error, token) => {
        if (error) {
            const err = `Error when generating token: ${error.message}`
          return reject(err);
        }
        resolve(token);
      });
    });
  };
