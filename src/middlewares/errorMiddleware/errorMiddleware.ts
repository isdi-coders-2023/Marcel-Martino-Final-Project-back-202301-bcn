import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import CustomError from "../../customError/CustomError";
const debug = createDebug("dronezone-api:middlewares");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not found");

  next(error);
};