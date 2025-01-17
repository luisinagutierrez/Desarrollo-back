import { Router } from "express";
import { controller } from "./order.controller.js";

export const orderRouter = Router();

orderRouter.get('/', controller.findAll);
orderRouter.get('/:id', controller.findOne);
//orderRouter.post('/', controller.add);
orderRouter.put('/:id', controller.update);
orderRouter.delete('/:id', controller.remove);