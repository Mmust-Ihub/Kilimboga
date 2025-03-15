import { Router } from "express";

import authRouter from "./auth.route.js";

const router = Router();
const defaultRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router ;
