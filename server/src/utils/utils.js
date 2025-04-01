import _ from "lodash";
import nodemailer from "nodemailer";
import config from "../config/config.js";
import { userModel } from "../models/user.model.js";
import allRoles from "../config/roles.js";
import axios from "axios";

export const blockList = (initialObj, arrayToblock) => {
  return _.omit(initialObj, arrayToblock);
};

export const allowList = (initialObj, arrayToAllow) => {
  return _.pick(initialObj, arrayToAllow);
};

export const generateCode = (length) => {
  const charset = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0, n = charset.length; i < length; i++) {
    code += charset.charAt(Math.floor(Math.random() * n));
  }
  return code;
};

export const sendEmail = async (payload) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.mail.username,
      pass: config.mail.password,
    },
  });

  try {
    await transporter.sendMail({
      from: config.mail.username,
      to: payload.to,
      subject: payload.subject,
      html: payload.body,
    });
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};

export const getNearbyExperts = async (farmerLocation) => {
  const experts = await userModel
    .find(
      {
        role: allRoles.EXPERT,
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: farmerLocation.coordinates,
            },
            $maxDistance: config.vet.distance,
            $minDistance: 0,
          },
        },
      },
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
      }
    )
    .limit(config.vet.limit);
  return experts;
};

export const getLocation = async (longitude, latitude) => {
  const url = "https://nominatim.openstreetmap.org/reverse";
  const params = {
    lat: latitude,
    lon: longitude,
    format: "json",
  };
  const response = await axios.get(url, {
    params,
  });
  return response.data;
};
