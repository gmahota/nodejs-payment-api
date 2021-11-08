import express, { NextFunction, Response, Request } from "express";

import path from "path";
import cors from "cors";

import routes from "./routes/routes";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from './swagger.json'

import "express-async-errors";

import errorHandler from "./errors/handler";



const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

export { app };
