import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/APiError.js";
import { catchAsync } from "../utils/catchAsync.js";
import httpStatus from "http-status";
import moment from "moment";
import { accountApprovalEmail } from "../utils/formatEmail.js";
import { allowList, blockList, sendEmail } from "../utils/utils.js";
import adminService from "../services/admin.service.js";
import paymentModel from "../models/payment.model.js";

const adminStats = catchAsync(async (req, res) => {
  const pipeline = [
    {
      $facet: {
        totalUsers: [{ $count: "count" }],
        verifiedUsers: [{ $match: { isVerified: true } }, { $count: "count" }],
        pendingApprovals: [
          { $match: { isSpecial: true, isApproved: false } },
          { $count: "count" },
        ],
        approvedUsers: [{ $match: { isApproved: true } }, { $count: "count" }],
        specialUsers: [{ $match: { isSpecial: true } }, { $count: "count" }],
        roleDistribution: [{ $group: { _id: "$role", count: { $sum: 1 } } }],
        recentUsers: [
          {
            $match: {
              joined: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
            },
          },
          { $count: "count" },
        ],
        userGrowth: [
          { $group: { _id: { $month: "$joined" }, count: { $sum: 1 } } },
          { $sort: { _id: 1 } },
        ],
      },
    },
  ];
  const salesPipeline = [
    { $match: { status: "completed" } },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalSales: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ];
  const data = await userModel.aggregate(pipeline);
  const salesStats = await paymentModel.aggregate(salesPipeline);
  return res.status(httpStatus.OK).json({ userData: data, salesData: salesStats });
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
