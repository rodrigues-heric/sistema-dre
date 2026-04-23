import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodObject } from "zod";
import { validate } from "./validateResource";

describe("validateResource Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  const testSchema = z.object({
    body: z.object({
      name: z.string().min(3),
    }),
  }) as unknown as ZodObject<any>;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();
    nextFunction = jest.fn();

    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };

    jest.clearAllMocks();
  });

  it("Should call next() if data are valid", () => {
    mockRequest = {
      body: { name: "Heric" },
      query: {},
      params: {},
    };

    const middleware = validate(testSchema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(statusMock).not.toHaveBeenCalled();
  });

  it("Should return 400 Bad Request if data are not valid", () => {
    mockRequest = {
      body: { name: "He" },
      query: {},
      params: {},
    };

    const middleware = validate(testSchema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
        message: "Failed to validate data",
        errors: expect.arrayContaining([
          expect.objectContaining({
            field: "name",
            message: expect.any(String),
          }),
        ]),
      }),
    );
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("Should throw unknown errors to the next middleware", () => {
    const brokenSchema = {
      parse: () => {
        throw new Error("Unexpected error");
      },
    } as any;

    mockRequest = { body: {}, query: {}, params: {} };

    const middleware = validate(brokenSchema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expect.any(Error));
  });
});
