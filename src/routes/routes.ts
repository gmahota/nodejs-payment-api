import { Router, Request, Response } from "express";
import authMiddleware from "../middlewares/auth";

// System Routers
import adminRouter from "./admin";
import authRouter from "./auth";
import baseRouter from "./base";
import paymentRouter from "./payment";

const routes = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home Page
 *     description: Can be used to testing an API.
*/
routes.get("/", async (request: Request, response: Response) => {
  response.send("WellCome!");
});

routes.use('/api', adminRouter);
routes.use('/api/auth', authRouter);
routes.use('/api', baseRouter);
routes.use('/api', paymentRouter);

export default routes;
