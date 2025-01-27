import { Router } from "express";
import { controller } from "./user.controller.js";

export const userRouter = Router();

//userRouter.get('/search', controller.findUserByEmail);
userRouter.get('/', controller.findAll);
userRouter.put('/update-password', controller.updatePassword);
userRouter.get('/:email', controller.findUserByEmail);
userRouter.delete('/:id', controller.remove);
userRouter.get('/:id', controller.findOne);
userRouter.put('/:id', controller.update);
userRouter.post('/', controller.signUp);