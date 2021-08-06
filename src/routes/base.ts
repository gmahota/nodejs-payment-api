import { Router } from "express";

import {
  get_all_companies,
  get_company,
  create_company
} from "../controllers/base/companyController";

import {
    get_all_customers,
    get_customer,
    create_customer
  } from "../controllers/base/customerController";


import authMiddleware from "../middlewares/auth";

const baseRouter = Router();



baseRouter.get("/customers", get_all_customers)
baseRouter.get("/customers/:id", get_customer)
baseRouter.post("/customers/",create_customer)
  
baseRouter.get("/companies", get_all_companies)
baseRouter.get("/companies/:id", get_company)
baseRouter.post("/companies/", create_company)

//Change my password
//router.post("/change-password", [checkJwt], AuthController.changePassword);

export default baseRouter;