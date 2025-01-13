import { Router } from "express";
import { controller } from "./product.controller.js";
import { upload } from "../shared/db/image_processor/multer_middleware.js";

export const productRouter = Router();


productRouter.get('/product/:name', controller.findProductByName);
productRouter.get('/', controller.findAll);
productRouter.get('/:id', controller.findOne);
productRouter.post('/', upload.single('image'), controller.add);
productRouter.put('/:id', controller.update);
productRouter.put('/:id/stock', controller.updateStock);  // revisar
productRouter.delete('/:id', controller.remove);
///productRouter.get('/category/:category', controller.listByCategory);