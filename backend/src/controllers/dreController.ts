import { Request, Response } from "express";

import * as DREService from "../services/dreService";

export const getTest = (request: Request, response: Response) => {
  try {
    const result = DREService.getData();
    response.status(200).json(result);
  } catch (error) {
    response
      .status(500)
      .json({ error: "an error occurred while getting data" });
  }
};
