import { Router } from "express";
import { controller } from "./order.controller.js";
import { authenticateAdmin } from "../auth/authMiddleware.js";

export const orderRouter = Router();

orderRouter.get('/user/email/:email', controller.findOrdersByEmail);
orderRouter.get('/', controller.findAll);
orderRouter.get('/:id', controller.findOne);
orderRouter.post('/', controller.create);
orderRouter.put('/:id', controller.update);
orderRouter.delete('/:id', authenticateAdmin, controller.remove);