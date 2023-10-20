import { Router } from "express";
import { controller} from "./province.controller.js";

export const provinceRouter = Router();

provinceRouter.get('/', controller.findAll);
provinceRouter.get('/:id', controller.findOne);
provinceRouter.post('/', controller.add); 
provinceRouter.put('/:id', controller.update);
provinceRouter.delete('/:id', controller.remove);
