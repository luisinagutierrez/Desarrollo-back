import { Router } from "express";
import { controller } from "./product.controller.js";

export const productRouter = Router();

productRouter.get('/', controller.findAll);
productRouter.get('/:id', controller.findOne);
productRouter.post('/', controller.add); 
productRouter.put('/:id', controller.update);
productRouter.delete('/:id', controller.remove);
productRouter.get('/category/:category', controller.listByCategory); //??
