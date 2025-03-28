import {Router} from "express"
import { validate } from "../../middleware/validator.js"
import { authenticate } from "../../middleware/auth.middleware.js"
import adminValidator from "../../validators/admin.validator.js"
import adminController from "../../controllers/admin.controller.js"

const adminRouter = Router()

adminRouter.get("/stats", authenticate, adminController.adminStats)
adminRouter.post("/approve", authenticate, validate(adminValidator.approveUserSchema), adminController.approveUser)

export default adminRouter
