import { Router } from "express";
import { controller } from "./user.controller.js";
import { authenticateAdmin } from "../auth/authMiddleware.js";

export const userRouter = Router();

userRouter.get('/', authenticateAdmin, controller.findAll);
userRouter.put('/update-password', controller.updatePassword);
userRouter.get('/by-email', controller.findUserByEmail);
userRouter.delete('/:id', controller.remove);
userRouter.get('/:id', controller.findOne);
userRouter.put('/:id', controller.update);
userRouter.post('/', controller.signUp);