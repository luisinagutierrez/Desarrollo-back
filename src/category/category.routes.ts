import { Router } from "express";
import { controller } from "./category.controller.js";

export const categoryRouter = Router();

categoryRouter.get('/:name/products', controller.findProductsByCategory);
categoryRouter.get('/category/:name', controller.findCategoryByName); 
categoryRouter.get('/', controller.findAll);
categoryRouter.get('/:id', controller.findOne);
categoryRouter.post('/', controller.add); 
categoryRouter.put('/:id', controller.update);
categoryRouter.delete('/:id', controller.remove);

