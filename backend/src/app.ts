import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/test", (request: Request, response: Response) => {
  response
    .json({
      status: "success",
      message: "Server is running!",
      timestamp: new Date().toISOString(),
    })
    .status(200);
});

export default app;
