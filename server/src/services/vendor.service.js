import orderModel from "../models/order.model.js";
import oderModel from "../models/order.model.js";
import mongoose from "mongoose";

const date = new Date();

const compareOrders = async (vendorId) => {
  try {
    // Current month start and end dates.
    const startCurrent = new Date(date.getFullYear(), date.getMonth(), 1);
    const endCurrent = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // previous month start and end dates
    const startPrevious = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const endPrevious = new Date(date.getFullYear(), date.getMonth(), 0);

    const currentMonthOrders = await orderModel.countDocuments({
      vendorId,
      orderedAt: { $gte: startCurrent, $lte: endCurrent },
    });

    const previousMonthOrders = await orderModel.countDocuments({
      vendorId,
      orderedAt: { $gte: startPrevious, $lte: endPrevious },
    });

    let percentageChange = 0;
    if (previousMonthOrders > 0) {
      percentageChange =
        ((currentMonthOrders - previousMonthOrders) / previousMonthOrders) *
        100;
    }
    return {
      currentMonthOrders,
      previousMonthOrders,
      percentageChange: percentageChange.toFixed(2),
    };
  } catch (error) {
    throw new Error("Error fetching order comparison", error);
  }
};

const stats = async (vendorId) => {
  const totalRevenue = await orderModel.aggregate([
    {
      $match: {
        vendorId: new mongoose.Types.ObjectId(`${vendorId}`),
        paymentStatus: "completed",
      },
    },
    { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } },
  ]);

  //   order status stats
  const pendingOrders = await orderModel.countDocuments({
    vendorId,
    deliveryStatus: "pending",
  });
  const deliveredOrders = await orderModel.countDocuments({
    vendorId,
    deliveryStatus: "delivered",
  });

  // Top 5 best selling products.
  const bestSellingProducts = await orderModel.aggregate([
    {
      $match: {
        vendorId: new mongoose.Types.ObjectId(`${vendorId}`),
        paymentStatus: "completed",
      },
    },
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.product",
        totalSold: { $sum: "$products.quantity" },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $project: {
        _id: 0,
        productId: "$_id",
        productName: "$productDetails.title",
        totalSold: 1,
      },
    },
  ]);

  //   monthly order distribution
  const monthlyOrders = await oderModel.aggregate([
    { $match: { vendorId: new mongoose.Types.ObjectId(`${vendorId}`) } },
    { $group: { _id: { $month: "$orderedAt" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  // monthly revenue distribution
  const monthlyRevenue = await oderModel.aggregate([
    {
      $match: {
        vendorId: new mongoose.Types.ObjectId(`${vendorId}`),
        paymentStatus: "completed",
      },
    },
    {
      $group: {
        _id: { $month: "$orderedAt" },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const comparison = await compareOrders(vendorId);

  const data = {
    totalRevenue: totalRevenue[0]?.totalSales || 0,
    pendingOrders,
    deliveredOrders,
    bestSellingProducts,
    monthlyOrders,
    monthlyRevenue,
    ...comparison,
  };
  return data;
};

export default { stats };
