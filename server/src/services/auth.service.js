import uploadFile from "../helpers/uploadFile.js";
import { userModel } from "../models/user.model.js";
import { blockList, generateVerificationCode, sendEmail } from "../utils/utils.js";
import { registerEmail } from "../utils/formatEmail.js";
import config from "../config/config.js";

const createUser = async (userBody, files) => {
  const { longitude, latitude } = userBody;
  userBody.location = {
    type: "Point",
    coordinates: [Number(longitude), Number(latitude)],
  };
  userBody = blockList(userBody, ["longitude", "latitude"]);
  if (userBody.isSpecial && !files.length == 0) {
    userBody.documents = await uploadFile(files[0]);
  }
  userBody.authCode = generateVerificationCode(config.auth.length);
  const newUser = await userModel.create(userBody);
  let payload = registerEmail({name: userBody.firstName, authCode: userBody.authCode});
  await sendEmail({...payload, to: userBody.email});
  return newUser;
};

export default { createUser };
