import { ApiError } from "../utils/APiError.js";
import {
  accountApprovalEmail,
  accountRestorationEmail,
  accountSuspensionEmail,
} from "../utils/formatEmail.js";
import moment from "moment";
import httpStatus from "http-status";
import { sendEmail } from "../utils/utils.js";
import paymentModel from "../models/payment.model.js";
import { userModel } from "../models/user.model.js";
import orderModel from "../models/order.model.js";

// service to manage users
const manage = async (action, user) => {
  const payload = {
    firstName: user.firstName,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
  };
  if (action === "approve") {
    if (user.isApproved) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User is already approved");
    }
    user.isApproved = true;
    await user.save();
    const email = accountApprovalEmail({
      ...payload,
      approvalDate: moment().toString(),
    });
    await sendEmail({ ...email, to: user.email });
    return "Account approved successfully";
  } else if (action === "suspend") {
    user.isSuspended = true;
    await user.save();
    const suspensionEmail = accountSuspensionEmail({
      ...payload,
      suspensionDate: moment().toString(),
      suspensionReason: "Failure to comply to kilimboga rules and regulations",
    });
    await sendEmail({ ...suspensionEmail, to: user.email });
    return "Account suspended successfully";
  }
  // restore the account
  else {
    user.isSuspended = false;
    await user.save();
    const restorationEmail = accountRestorationEmail({
      ...payload,
      restorationDate: moment().toString(),
    });
    await sendEmail({ ...restorationEmail, to: user.email });
    return "Account restored successfully";
  }
};

// Admin stats
const getAdminStats = async () => {
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
      $facet: {
        monthlyRevenue: [
          {
            $group: {
              _id: { $month: "$createdAt" },
              totalSales: { $sum: "$amount" },
            },
          },
          { $sort: { _id: 1 } },
        ],

        totalRevenue: [
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$amount" },
            },
          },
        ],
      },
    },
  ];

  const orderPipeline = [
    {
      $facet: {
        totalOrders: [{ $count: "count" }],

        pendingOrders: [
          { $match: { deliveryStatus: "pending" } },
          { $count: "count" },
        ],

        shippedOrders: [
          { $match: { deliveryStatus: "shipped" } },
          { $count: "count" },
        ],

        deliveredOrders: [
          { $match: { deliveryStatus: "delivered" } },
          { $count: "count" },
        ],

        monthlyOrders: [
          {
            $group: {
              _id: { $month: "$orderedAt" },
              count: { $sum: 1 },
              revenue: { $sum: "$totalAmount" },
            },
          },
          { $sort: { _id: 1 } },
        ],
      },
    },
  ];

  return await Promise.all([
    userModel.aggregate(pipeline),
    paymentModel.aggregate(salesPipeline),
    orderModel.aggregate(orderPipeline),
  ]);
};

export default { manage, getAdminStats };
