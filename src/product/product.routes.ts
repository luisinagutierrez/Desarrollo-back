import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { controller } from "./product.controller.js";

export const productRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'src', 'uploadsProductsPhotographs'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

productRouter.get('/product/:name', controller.findProductByName);
productRouter.get('/', controller.findAll);
productRouter.get('/:id', controller.findOne);
productRouter.post('/', upload.single('image'), controller.add);
productRouter.put('/:id', controller.update);
productRouter.delete('/:id', controller.remove);
productRouter.get('/category/:category', controller.listByCategory);