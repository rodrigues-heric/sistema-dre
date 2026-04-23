import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getTest } from "./dreController";
import * as DREService from "../services/dreService";

jest.mock("../services/dreService");

describe("DREController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();

    mockRequest = {
      query: {
        month: "2024-01",
        vertical: "Varejo",
      },
    };

    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };

    jest.clearAllMocks();
  });

  it("Should return 200 and the data retrieved", () => {
    const mockData = {
      mes: "2024-01",
      vertical: "Varejo",
      valor_bruto: 100,
    };

    (DREService.getData as jest.Mock).mockReturnValue(mockData);

    getTest(mockRequest as any, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockData);
    expect(DREService.getData).toHaveBeenCalledWith("2024-01", "Varejo");
  });

  it("Should return 200 and null when there is no data for the combination", () => {
    (DREService.getData as jest.Mock).mockReturnValue(null);

    getTest(mockRequest as any, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(null);
  });
});
