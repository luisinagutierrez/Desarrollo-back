import { Router } from "express";
import { controller } from "./user.controller.js";

export const userRouter = Router();

userRouter.get('/:email', controller.findUserByEmail); 
userRouter.get('/', controller.findAll);
userRouter.get('/:id', controller.findOne);
userRouter.put('/:id', controller.update);
userRouter.delete('/:id', controller.remove);
userRouter.post('/', controller.signUp); 
//userRouter.post('/', controller.login); //hay q pasarle mail y contraseña
