import { AppError } from "./appError";
import { StatusCodes } from "http-status-codes";

describe("AppError", () => {
  it("Should instantiate an error with message", () => {
    const message = "Resource Not Found";
    const statusCode = StatusCodes.NOT_FOUND;

    const error = new AppError(message, statusCode);

    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
  });

  it("Should use status code 400 as default", () => {
    const error = new AppError("Default error");

    expect(error.statusCode).toBe(400);
  });

  it("Should be an instance of Error and AppError", () => {
    const error = new AppError("Instance error");

    expect(error instanceof Error).toBe(true);
    expect(error instanceof AppError).toBe(true);
  });

  it("Should capture the stack trace correctly", () => {
    const error = new AppError("Error with stack");

    expect(error.stack).toBeDefined();
    expect(error.name).toBe("Error");
  });
});
