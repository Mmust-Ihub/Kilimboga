import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import xss from "xss-clean";
import httpStatus from "http-status";
import config from "./config/config.js";
import morgan from "./config/morgan.js";
import multer from "multer"
import { authLimit } from "./middleware/auth.middleware.js";
import router from "./routes/v1/index.js";
import { ApiError } from "./utils/APiError.js";
import { errorConverter, errorHandler } from "./middleware/error.js";

const app = express();
const upload = multer()

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// middlewares
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.options("*", cors());
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(upload.any());

if (config.env == "production") {
  app.use("/api/v1/auth", authLimit);
}
app.get("/api/healthcheck", async (req, res) => {
  res.status(200).json({ status: "success", message: "Api is up and running" });
});
app.use("/api/v1", router);

app.use(async (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "The path does not exist"));
});

app.use(errorConverter);

app.use(errorHandler);
export default app;
