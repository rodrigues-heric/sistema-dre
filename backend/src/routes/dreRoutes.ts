import { Router } from "express";

import * as DREController from "../controllers/dreController";

const routerDRE: Router = Router();

routerDRE.get("/dre-rentabilidade", DREController.getTest);

export default routerDRE;
