import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/APiError.js";
import { userModel } from "../models/user.model.js";
import authService from "../services/auth.service.js";
import { generateAccessToken } from "../helpers/jwt.js";

const registerUser = catchAsync(async (req, res) => {
  const phoneRegex = /^(07|01)\d{8}$/;
  if (!phoneRegex.test(req.body.phoneNumber)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid phone number ...");
  }
  if (await userModel.isEmailTaken(req.body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "email is already taken ...");
  }
  if (await userModel.isNumberTaken(req.body.phoneNumber)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Phone number is already taken ..."
    );
  }
  await authService.createUser(req.body, req.files);
  return res
    .status(httpStatus.CREATED)
    .json({ status: "success", message: "user created successfully" });
});

const verifyAccount = catchAsync(async (req, res) => {
  const { authCode } = req.body;
  const user = await userModel.findOne({ authCode });
  if (!user) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ failed: "Invalid authentication code" });
  }
  user.isVerified = true;
  await user.save();
  return res
    .status(httpStatus.OK)
    .json({ success: "Account verified successfully." });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password.");
  }
  if (!user.isVerified) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please verify your account.");
  }
  if (user.isSuspended) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Your account has been suspended.");
  }

  if(user.isSpecial && !user.isApproved){
    throw new ApiError(httpStatus.UNAUTHORIZED, "You account is waiting for approval.");
  }
  const token = await generateAccessToken({
    id: user.id,
    email: email,
    role: user.role,
  });
  return res
    .status(200)
    .json({ status: "success", token: token, user: { _id: user.id, firstName: user.firstName, lastName: user.lastName, email: email, role: user.role, phoneNumber: user.phoneNumber} });
});

export default { registerUser, verifyAccount, login };
