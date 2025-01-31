import { Router } from "express";
import { controller } from "./product.controller.js";
import { upload } from "../shared/db/image_processor/multer_middleware.js";

export const productRouter = Router();


productRouter.get('/:name', controller.findProductByName);
productRouter.get('/search', controller.search);
productRouter.get('/', controller.findAll);
productRouter.get('/:id', controller.findOne);
productRouter.post('/', upload.single('image'), controller.add);
productRouter.put('/:id', controller.update);
productRouter.get('/:id/verify-stock', controller.verifyStock);
productRouter.delete('/:id', controller.remove);