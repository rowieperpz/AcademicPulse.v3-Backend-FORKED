import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import AppError from "./errors/appError";
import globalErrorHandler from "./controllers/globalErrorHandler";
import authRoute from "./routes/authRoutes";
import userRoute from "./routes/userRoutes";
import appRoute from "./routes/appRoutes";
import protect from "./middlewares/protect";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRoute);
app.use("/api/v1/user", protect, userRoute);
app.use("/api/v1/app", protect, appRoute);
app.all("*", (req: Request, res: Response, next: NextFunction) =>
  next(new AppError(`Can't find ${req.originalUrl} from the server`, 404))
);

app.use(globalErrorHandler);

export default app;
