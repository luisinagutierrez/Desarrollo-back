import { Router } from "express";
import { controller } from "./supplier.controller.js";


export const supplierRouter = Router();

supplierRouter.get('/:cuit/products', controller.findProductsBySupplier);
supplierRouter.get('/:cuit', controller.findSupplierByCuit);
supplierRouter.get('/', controller.findAll);
supplierRouter.post('/', controller.add); 
supplierRouter.put('/:id', controller.update);
supplierRouter.delete('/:id', controller.remove);
