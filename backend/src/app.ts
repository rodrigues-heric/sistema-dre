import express, { Express } from "express";
import coloredMorgan from "./logger";

import routerDRE from "./routes/dreRoutes";

const API_PREFIX: string = "/api/v1";
const app: Express = express();

app.use(express.json());
app.use(coloredMorgan);

app.use(`${API_PREFIX}/dre`, routerDRE);

export default app;
