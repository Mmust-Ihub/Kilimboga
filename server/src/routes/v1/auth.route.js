import {Router} from "express"
import { validate } from "../../middleware/validator.js"
import authValidation from "../../validators/auth.validator.js"
import authController from "../../controllers/auth.controller.js"
const authRouter = Router()

authRouter.post("/register", validate(authValidation.registerUserSchema),  authController.registerUser)
authRouter.post("/verify", validate(authValidation.verifyAccountSchema),  authController.verifyAccount)
authRouter.post("/login", validate(authValidation.loginSchema),  authController.login)

export default authRouter