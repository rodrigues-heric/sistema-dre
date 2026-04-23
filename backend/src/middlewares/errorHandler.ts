import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error("[ERROR] ", error);

  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "Internal Server Error",
  });
};
