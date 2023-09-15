import { Router } from "express";
import { controller } from "./supplier.controller.js";

export const supplierRouter = Router();

supplierRouter.get('/', controller.findAll);
supplierRouter.get('/:id', controller.findOne);
supplierRouter.post('/', controller.sanitizeSupplierInput, controller.add); 
supplierRouter.put('/:id', controller.sanitizeSupplierInput, controller.update);
supplierRouter.patch('/:id', controller.sanitizeSupplierInput, controller.update);
supplierRouter.delete('/:id', controller.remove);