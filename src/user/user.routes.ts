import { Router } from "express";
import { controller } from "./user.controller.js";

export const userRouter = Router();

userRouter.get('/', controller.findAll);
userRouter.get('/:id', controller.findOne);
userRouter.post('/', controller.sanitizeUserInput, controller.add); 
userRouter.put('/:id', controller.sanitizeUserInput, controller.update);
userRouter.patch('/:id', controller.sanitizeUserInput, controller.update);
userRouter.delete('/:id', controller.remove);
userRouter.get('/login', controller.sanitizeUserInput, controller.login);
