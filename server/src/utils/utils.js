import _ from "lodash";
import nodemailer from "nodemailer";
import config from "../config/config.js";

export const blockList = (initialObj, arrayToblock) => {
  return _.omit(initialObj, arrayToblock);
};

export const allowList = (initialObj, arrayToAllow) => {
  return _.pick(initialObj, arrayToAllow);
};

export const generateVerificationCode = (length) => {
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
    console.error(`Error sending email: ${err.message}`);
  }
};
