import { Router } from "express";
import { controller } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post('/reset-password', controller.resetPassword);
