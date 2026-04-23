import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as DREService from "../services/dreService";
import { GetDreDTO } from "../schemas/dreSchema";
import { DreData } from "../interfaces/dreInterface";

type GetDreRequest = Request<Record<string, string>, any, any, GetDreDTO>;

export const getTest = (request: GetDreRequest, response: Response) => {
  const result: DreData | null = DREService.getData(
    request.query.month,
    request.query.vertical,
  );
  response.status(StatusCodes.OK).json(result);
};
