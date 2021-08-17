import { Router, Request, Response } from "express";

import {
  get_all_users,
  get_user,
  create_user,
  delete_user,
} from "../controllers/admin/userController";

const adminRouter = Router();

adminRouter.get("/users", get_all_users)

adminRouter.get("/users/:id", get_user)
adminRouter.post("/users", create_user)
adminRouter.delete("/users/:id", delete_user)

export default adminRouter