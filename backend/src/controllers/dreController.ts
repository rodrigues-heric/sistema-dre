import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as DREService from "../services/dreService";
import { GetDreDTO } from "../schemas/dreSchema";

type GetDreRequest = Request<Record<string, string>, any, any, GetDreDTO>;

export const getTest = (request: GetDreRequest, response: Response) => {
  const result = {
    month: request.query.month,
    vertical: request.query.vertical,
  };
  response.status(StatusCodes.OK).json(result);
};
