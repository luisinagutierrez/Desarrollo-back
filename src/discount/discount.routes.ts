import { Router } from "express";
import { controller } from "./discount.controller.js";

export const discountRouter = Router();

discountRouter.get('/', controller.findAll);
discountRouter.get('/:id', controller.findOne);
discountRouter.post('/', controller.add); 
discountRouter.put('/:id', controller.update);
discountRouter.delete('/:id', controller.remove);
