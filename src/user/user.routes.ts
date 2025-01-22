import { Router } from "express";
import { controller } from "./user.controller.js";

export const userRouter = Router();

userRouter.get('/', controller.findAll);
userRouter.get('/:email', controller.findUserByEmail);  /////
userRouter.put('/update-password', controller.updatePassword);
userRouter.get('/:id', controller.findOne);
userRouter.put('/:id', controller.update);
userRouter.delete('/:id', controller.remove);
userRouter.post('/', controller.signUp); 
