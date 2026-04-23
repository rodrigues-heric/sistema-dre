import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "./errorHandler";
import { AppError } from "../utils/appError";

describe("errorHandler Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();

    mockRequest = {};
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should treat known errors and log messages correctly", () => {
    const errorMsg = "Vertical não encontrada";
    const statusCode = StatusCodes.NOT_FOUND;
    const error = new AppError(errorMsg, statusCode);

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(statusMock).toHaveBeenCalledWith(statusCode);
    expect(jsonMock).toHaveBeenCalledWith({
      status: "error",
      message: errorMsg,
    });
  });

  it("Should treat generic errors as 500 Internal Server Error", () => {
    const error = new Error("Falha no banco de dados");

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(jsonMock).toHaveBeenCalledWith({
      status: "error",
      message: "Internal Server Error",
    });

    expect(console.error).toHaveBeenCalled();
  });
});
