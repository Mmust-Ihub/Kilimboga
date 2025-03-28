import { Router } from "express";
import iotController from "../../controllers/iot.controller.js";
const iotRouter = Router();

iotRouter.post("/data", iotController.processData);

export default iotRouter;
