import { Router } from "express";
import { controller} from "./province.controller.js";

export const provinceRouter = Router();

provinceRouter.get('/name/:name', controller.findProvinceByName); // provinces ?filter = {name : 'cordoba'} oo ? name = Cordoba
provinceRouter.get('/cities/:id', controller.findCitiesByProvince); /// provinces /id/cities openApi (v3)
provinceRouter.get('/', controller.findAll);
provinceRouter.get('/:id', controller.findOne);
provinceRouter.post('/', controller.add); 
provinceRouter.patch('/:id', controller.update);
provinceRouter.delete('/:id', controller.remove);
