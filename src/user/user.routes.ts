import { Router } from "express";
import { controller } from "./user.controller.js";

export const eUserRouter = Router();

eUserRouter.get('/', controller.findAll);
eUserRouter.get('/:id', controller.findOne);
eUserRouter.post('/', controller.sanitizeUserInput, controller.add); 
eUserRouter.put('/:id', controller.sanitizeUserInput, controller.update);
eUserRouter.patch('/:id', controller.sanitizeUserInput, controller.update);
eUserRouter.delete('/:id', controller.remove);
