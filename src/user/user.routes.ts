import { Router } from "express";
import { controller } from "./user.controller.js";

export const userRouter = Router();

userRouter.get('/', controller.findAll);
userRouter.get('/:id', controller.findOne);
userRouter.post('/', controller.signUp); 
userRouter.put('/:id', controller.update);
userRouter.delete('/:id', controller.remove);
//userRouter.post('/login', controller.login);
