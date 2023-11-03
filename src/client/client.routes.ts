import { Router } from "express";
import { controller } from "./client.controller.js";

export const clientRouter = Router();

clientRouter.get('/', controller.findAll);
clientRouter.get('/:id', controller.findOne);
clientRouter.post('/', controller.add); 
clientRouter.put('/:id', controller.update);
clientRouter.delete('/:id', controller.remove);
