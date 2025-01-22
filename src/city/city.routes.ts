import { Router } from "express";
import { controller } from "./city.controller.js";

export const cityRouter = Router();

cityRouter.get('/postCode/:postCode', controller.findCityByPostCode);
//cityRouter.get('/:provinceId', controller.findCitiesByProvince);
cityRouter.get('/:id', controller.findOne);
cityRouter.get('/', controller.findAll);
cityRouter.post('/', controller.add); 
cityRouter.put('/:id', controller.update);
cityRouter.delete('/:id', controller.remove);
