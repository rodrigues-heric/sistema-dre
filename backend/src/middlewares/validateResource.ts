import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validate =
  (schema: ZodObject) =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: request.body,
        query: request.query,
        params: request.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({
          status: "error",
          message: "Failed to validate data",
          errors: error.issues.map((err) => {
            return { field: err.path[1], message: err.message };
          }),
        });
      }
      next(error);
    }
  };
