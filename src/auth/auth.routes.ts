import { Router } from "express";
import { controller } from "./auth.controller.js";
import Users from './auth.dao.js'

export const authRouter = Router();

authRouter.post('/reset-password', controller.resetPassword);
authRouter.post('/login', controller.loginUser)
//authRouter.post('/update-email', controller.updateEmail);
