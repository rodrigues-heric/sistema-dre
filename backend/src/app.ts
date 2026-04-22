import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));

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
