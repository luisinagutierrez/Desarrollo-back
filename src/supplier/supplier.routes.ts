import { Router } from "express";
import { controller } from "./supplier.controller.js";

export const supplierRouter = Router();

supplierRouter.get('/', controller.findAll);
supplierRouter.get('/:id', controller.findOne);
supplierRouter.post('/', controller.add); 
supplierRouter.put('/:id', controller.update);
supplierRouter.delete('/:id', controller.remove);
supplierRouter.get('/city/:city', controller.listSuppliersByCity); //??
