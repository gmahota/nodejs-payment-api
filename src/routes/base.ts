import { Router } from "express";

import * as banks from "../controllers/base/bankController";

import * as banksAccount from "../controllers/base/bankAccountController";

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

baseRouter
  .get("/banks", banks.get_all)
  .get("/banks/:id", banks.get_bank)
  .post("/banks/", banks.create_bank)

baseRouter
  .get("/bankaccounts", banksAccount.get_all)
  .get("/bankaccounts/:id", banksAccount.get_bankAccount)
  .post("/bankaccounts/", banksAccount.create_bankAccount)

baseRouter.get("/customers", get_all_customers)
baseRouter.get("/customers/:id", get_customer)
baseRouter.post("/customers/", create_customer)

baseRouter.get("/companies", get_all_companies)
baseRouter.get("/companies/:id", get_company)
baseRouter.post("/companies/", create_company)

//Change my password
//router.post("/change-password", [checkJwt], AuthController.changePassword);

export default baseRouter;