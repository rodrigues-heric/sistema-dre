import { Request, Response } from "express";

export const getTest = (request: Request, response: Response) => {
  response.status(200).json({ message: "success" });
};
