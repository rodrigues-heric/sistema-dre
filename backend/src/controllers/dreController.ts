import { Request, Response } from "express";

import * as DREService from "../services/dreService";

export const getTest = (request: Request, response: Response) => {
  const result = DREService.getData();
  response.status(200).json(result);
};
