import { Router, Request, Response } from "express";

const routerDRE: Router = Router();

routerDRE.get("/dre-rentabilidade", (request: Request, response: Response) => {
  response.status(200).json({
    message: "success",
  });
});

export default routerDRE;
