
import { Router } from "express";
import { validate } from "../../middleware/validator.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import vendorValidate from "../../validators/vendor.validate.js";
import vendorController from "../../controllers/vendor.controller.js";
const vendorRouter = Router();

vendorRouter.get("/stats", authenticate, vendorController.getStats);
vendorRouter.get("/profile", authenticate, vendorController.getProfile);
vendorRouter.patch("/profile", authenticate, vendorController.editProfile);
vendorRouter.post(
  "/product",
  validate(vendorValidate.addProductSchema),
  authenticate,
  vendorController.addProduct
);
vendorRouter.get("/products", authenticate, vendorController.getProducts);
vendorRouter.patch("/product", vendorController.editProduct);
vendorRouter.delete("/product", authenticate, vendorController.deleteProduct);
vendorRouter.get("/orders", authenticate, validate(vendorValidate.getOrders), vendorController.getOrders);

export default vendorRouter;