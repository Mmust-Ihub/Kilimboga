import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync.js";
import {
  allowList,
  generateCode,
  getLocation,
  getNearbyExperts,
} from "../utils/utils.js";
import { greenHouseModel } from "../models/farmer.model.js";
import AIModel from "../helpers/AIModel.js";
import formatPrompt from "../utils/formatPrompt.js";
import { ApiError } from "../utils/APiError.js";
import farmerService from "../services/farmer.service.js";
import db from "../helpers/firebase.js";
import config from "../config/config.js";

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
  let greenHouses = await greenHouseModel.find({ farmerId: req.user.id });
  let houses = [];
  greenHouses.forEach((greenhouse) => {
    houses.push(allowList(greenhouse, ["name", "farmId"]));
  });
  return res.status(httpStatus.OK).json(houses);
});

const predict = catchAsync(async (req, res) => {
  const { location } = await greenHouseModel.findOne({farmId: req.body.farmId})
  const nearbyExperts = await getNearbyExperts(location);
  if (req.query.type === "pest") {
    let response = await farmerService.predictPest(req.files[0]);
    // store results
    return res
      .status(httpStatus.OK)
      .json({ ...response, nearbyExperts: nearbyExperts});
  }
  let response = await farmerService.predictDisease(req.files[0]);
  // store results
  return res
    .status(httpStatus.OK)
    .json({ ...response, nearbyExperts: nearbyExperts});
});

const connectFarmer = catchAsync(async (req, res) => {
  const userData = allowList(req.user, [
    "firstName",
    "lastName",
    "phoneNumber",
  ]);
  const { coordinates } = req.user.location;
  const { display_name } = await getLocation(coordinates[0], coordinates[1]);
  const payload = { ...userData, location: display_name, ...req.body };
  await db.collection(config.firebase.expert_coll).add(payload);
  return res
    .status(httpStatus.OK)
    .json({ success: "Connected to the expert successfully." });
});

export default {
  famerProfile,
  farmerStats,
  addGreenHouse,
  getGreenHouses,
  predict,
  connectFarmer,
};
