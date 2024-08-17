import { Router } from "express";
import multer from 'multer';
import { controller } from "./product.controller.js";

export const productRouter = Router();

productRouter.get('/product/:name', controller.findProductByName);
productRouter.get('/', controller.findAll);
productRouter.get('/:id', controller.findOne);
productRouter.post('/', controller.add); 
//productRouter.post('/', upload.single('image'), controller.add);
productRouter.put('/:id', controller.update); // con el put tmb funciona 
productRouter.delete('/:id', controller.remove);
productRouter.get('/category/:category', controller.listByCategory); //??
//productRouter.patch('/cart', controller.orderProductStock); //??