import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync.js";
import {
  allowList,
  blockList,
  generateCode,
  getNearbyExperts,
} from "../utils/utils.js";
import { greenHouseModel } from "../models/farmer.model.js";
import AIModel from "../helpers/AIModel.js";
import formatPrompt from "../utils/formatPrompt.js";
import { ApiError } from "../utils/APiError.js";
import farmerService from "../services/farmer.service.js";
import allRoles from "../config/roles.js";
import productModel from "../models/product.model.js";
import { userModel } from "../models/user.model.js";
import uploadFile from "../helpers/uploadFile.js";
import orderModel from "../models/order.model.js";

const famerProfile = catchAsync(async (req, res) => {
  const profile = allowList(req.user, [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
  ]);
  return res.status(httpStatus.OK).json(profile);
});

const farmerStats = catchAsync(async (req, res) => {
  const greenHouses = await greenHouseModel.countDocuments({
    farmerId: req.user.id,
  });
  return res.status(httpStatus.OK).json({ greenHouses });
});

const addGreenHouse = catchAsync(async (req, res) => {
  const prompt = formatPrompt.farmGuidePrompt(req.body.plant);
  req.body.schedule = await AIModel.farmGuide(prompt);
  let farmId = generateCode(5);
  while (await greenHouseModel.isCodeTaken(farmId)) {
    farmId = generateCode(5);
  }
  await greenHouseModel.create({ ...req.body, farmId, farmerId: req.user.id });
  return res
    .status(httpStatus.CREATED)
    .json({ status: "success", message: "farm added successfully" });
});

const getGreenHouses = catchAsync(async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    let greenHouse = await greenHouseModel
      .findOne({ farmId: req.query.id })
      .lean();
    if (!greenHouse) {
      throw new ApiError(404, "GreenHouse not found");
    }
    greenHouse = allowList(greenHouse, ["name", "plant", "farmId", "schedule"]);
    return res.status(httpStatus.OK).json(greenHouse);
  }
  let greenHouses = await greenHouseModel
    .find({ farmerId: req.user.id })
    .sort({ createdAt: -1 })
    .lean();
  let houses = [];
  greenHouses.forEach((greenhouse) => {
    houses.push(blockList(greenhouse, ["createdAt", "updatedAt"]));
  });
  return res.status(httpStatus.OK).json(houses);
});

const predict = catchAsync(async (req, res) => {
  const { location } = await greenHouseModel.findOne({
    farmId: req.body.farmId,
  });
  const nearbyExperts = await getNearbyExperts(location);
  if (req.query.type === "pest") {
    let response = await farmerService.predictPest(req.files[0]);
    // store results
    return res
      .status(httpStatus.OK)
      .json({ ...response, nearbyExperts: nearbyExperts });
  }
  let response = await farmerService.predictDisease(req.files[0]);
  // store results
  return res
    .status(httpStatus.OK)
    .json({ ...response, nearbyExperts: nearbyExperts });
});

const getProducts = catchAsync(async (req, res) => {
  let { page = 1, perPage = 10, category } = req.query;
  page = parseInt(page);
  perPage = parseInt(perPage);
  const filter = {
    ...(category && { category }),
    quantity: { $gte: 1 },
  };
  const products = await productModel
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);
  const totalProducts = await productModel.countDocuments(filter);
  return res.status(httpStatus.OK).json({
    totalProducts,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / perPage),
    products,
  });
});

const getExperts = catchAsync(async (req, res) => {
  const { location } = req.user;
  const experts = await getNearbyExperts(location);
  return res.status(httpStatus.OK).json(experts);
});

const requestToBeExpert = catchAsync(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  const files = req.files;
  if (!files?.length == 0) {
    user.documents = await uploadFile(files[0]);
    user.role = allRoles.EXPERT;
    user.isSpecial = true;
  }
  await user.save();
  return res.status(httpStatus.ACCEPTED).json({
    status: "success",
    message: "Your request has been received for processing.",
  });
});

const orderProducts = catchAsync(async (req, res) => {
  const {CheckoutRequestID } = await farmerService.initiateCheckout(req.user, req.body);
  await farmerService.processOrders(req.user, req.body, CheckoutRequestID);
  return res.status(httpStatus.OK).json({"message": "order placed successfully"});
});

const getOrders = catchAsync(async(req, res) => {
  const deliveryStatus = req.query.status
  if(deliveryStatus !== "all"){
    const orders = await orderModel.find({deliveryStatus}).sort({orderedAt: -1})
    const ordersCount = await orderModel.countDocuments({deliveryStatus})
    return res.status(httpStatus.OK).json({ordersCount, orders})
  }
  const orders = await orderModel.find().sort({orderedAt: -1})
  const ordersCount = await orderModel.countDocuments()
  return res.status(httpStatus.OK).json({ordersCount, orders})
})

const updateOrder = catchAsync(async(req, res) => {
  const order = await orderModel.findById(req.params.id)
  if(!order){
    throw new ApiError(404, "The order does not exist")
  }
  order.deliveryStatus = "delivered"
  await order.save()
  return res.status(httpStatus.OK).json({"message": "order updated successfully."})
})

export default {
  famerProfile,
  farmerStats,
  addGreenHouse,
  getGreenHouses,
  predict,
  getProducts,
  getExperts,
  requestToBeExpert,
  orderProducts,
  getOrders,
  updateOrder
};
