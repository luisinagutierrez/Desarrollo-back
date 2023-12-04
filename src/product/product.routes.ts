import { Router } from "express";
import { controller } from "./product.controller.js";

export const productRouter = Router();


productRouter.get('/:name', controller.findProductByName);
productRouter.get('/', controller.findAll);
productRouter.get('/:id', controller.findOne);
productRouter.post('/', controller.add); 
productRouter.patch('/:id', controller.update); // con el put tmb funciona 
productRouter.delete('/:id', controller.remove);
productRouter.get('/category/:category', controller.listByCategory); //??
productRouter.get('/search/:searchTerm', controller.searchProducts); //??
productRouter.patch('/cart', controller.orderProductStock); //??
