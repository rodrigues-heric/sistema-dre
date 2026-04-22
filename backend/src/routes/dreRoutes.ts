import { Router } from "express";

import * as DREController from "../controllers/dreController";

import { validate } from "../middlewares/validateResource";
import { getDRESchema } from "../schemas/dreSchema";

const routerDRE: Router = Router();

routerDRE.get(
  "/dre-rentabilidade",
  validate(getDRESchema),
  DREController.getTest,
);

export default routerDRE;
