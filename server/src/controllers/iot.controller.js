import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync.js";
import iotService from "../services/iot.service.js";
import config from "../config/config.js";
import db from "../helpers/firebase.js";
import { blockList } from "../utils/utils.js";

const processData = catchAsync(async (req, res) => {
  const { farmId } = req.body;
  await iotService.process(req.body);
  const docRef = db.collection(config.firebase.iot_coll).doc(farmId);
  docRef.set(blockList(req.body, ["thresholds"]));

  return res.status(httpStatus.OK).json({"status": "ok"});
});

export default { processData };
