import {Router} from "express"
import { validate } from "../../middleware/validator.js"
import farmerValidator from "../../validators/farmer.validator.js"
import farmerController from "../../controllers/farmer.controller.js"
import { authenticate } from "../../middleware/auth.middleware.js"
const farmerRouter = Router()

farmerRouter.get("/profile", authenticate, farmerController.famerProfile)
farmerRouter.get("/stats", authenticate, farmerController.farmerStats)
farmerRouter.post("/green-house", validate(farmerValidator.AddGreenHouseSchema),  authenticate, farmerController.addGreenHouse)
farmerRouter.get("/green-house",  authenticate, farmerController.getGreenHouses)
farmerRouter.post("/predict", validate(farmerValidator.predictSchema), authenticate, farmerController.predict)
farmerRouter.post("/connect", validate(farmerValidator.connect), authenticate, farmerController.connectFarmer)

export default farmerRouter