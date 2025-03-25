import { Router } from "express";

import authRouter from "./auth.route.js";
import farmerRouter from "./farmer.route.js";
import adminRouter from "./admin.route.js";
import vendorRouter from "./vendor.routes.js";

const router = Router();
const defaultRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/farmer",
    route: farmerRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
  {
    path: "/vendor",
    route: vendorRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
