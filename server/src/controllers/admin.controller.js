import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/APiError.js";
import { catchAsync } from "../utils/catchAsync.js";
import httpStatus from "http-status";
import { allowList, blockList } from "../utils/utils.js";
import adminService from "../services/admin.service.js";

const adminStats = catchAsync(async (req, res) => {
  const [userData, salesData, orderData] = await adminService.getAdminStats();
  return res.status(httpStatus.OK).json({ userData, salesData, orderData });
});

const manageUsers = catchAsync(async (req, res) => {
  const user = await userModel.findById(req.body.id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User with id not found");

  const { action } = req.query;
  const response = await adminService.manage(action, user);
  return res
    .status(httpStatus.OK)
    .json({ status: "success", message: response });
});

const getUsers = catchAsync(async (req, res) => {
  const filter = req.query;
  const allowedInfo = ["_id", "firstName", "lastName", "email", "location"];
  let output = await userModel.find(filter).sort({ createdAt: -1 });
  let users = [];
  output.forEach((user) => {
    users.push(allowList(user, allowedInfo));
  });
  const totalCount = await userModel.countDocuments(filter);
  return res.status(httpStatus.OK).json({ totalCount, users });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userModel.findById(req.params.id).lean();
  const blockedList = ["authCode", "createdAt", "updatedAt", "password"];
  return res.status(httpStatus.OK).json(blockList(user, blockedList));
});

export default { adminStats, manageUsers, getUsers, getUser };
