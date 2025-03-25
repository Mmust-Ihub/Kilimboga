import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/APiError.js";
import { catchAsync } from "../utils/catchAsync.js";
import httpStatus from "http-status";
import moment from "moment";
import { accountApprovalEmail } from "../utils/formatEmail.js";
import { sendEmail } from "../utils/utils.js";

const adminStats = catchAsync(async (req, res) => {
  const pipeline = [
    {
      $facet: {
        totalUsers: [{ $count: "count" }],
        verifiedUsers: [{ $match: { isVerified: true } }, { $count: "count" }],
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
  const data = await userModel.aggregate(pipeline);
  return res.status(httpStatus.OK).json(data);
});

const approveUser = catchAsync(async (req, res) => {
  const user = await userModel.findById(req.body.id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User with id not found");
  if (user.isApproved) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is already approved");
  }
  user.isApproved = true;
  await user.save();
  const email = accountApprovalEmail({
    firstName: user.firstName,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    approvalDate: moment().toString(),
  });
  await sendEmail({ ...email, to: user.email });
  return res
    .status(httpStatus.ACCEPTED)
    .json({ status: "success", message: "Account approved successfully." });
});

export default { adminStats, approveUser };
