import { Router } from "express";
import { controller } from "./supplier.controller.js";
import { authenticateAdmin } from "../auth/authMiddleware.js";



export const supplierRouter = Router();

supplierRouter.get('/:cuit/products', controller.findProductsBySupplier);
supplierRouter.get('/:cuit', controller.findSupplierByCuit);
supplierRouter.get('/', controller.findAll);
supplierRouter.post('/', authenticateAdmin, controller.add); 
supplierRouter.put('/:id', authenticateAdmin, controller.update);
supplierRouter.delete('/:id', authenticateAdmin, controller.remove);
