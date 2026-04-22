import express, { Express, Request, Response, NextFunction } from "express";

const app: Express = express();
const PORT: number = 3000;

app.get("/test", (request: Request, response: Response) => {
  response.json({
    status: "success",
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server runnig: http://localhost:${PORT}`);
});
