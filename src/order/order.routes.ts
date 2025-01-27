import { Router } from "express";
import { controller } from "./order.controller.js";

export const orderRouter = Router();

orderRouter.get('/', controller.findAll);
orderRouter.post('/:userId/create', controller.createOrder); // ESTA ES LA RUTA NUEVA QUE AGREGUÉ, EN EL CONTROLLER ESTÁ ABAJO DE TODO, 
// SI QURES SACARLE EL ID USER COMO ESTÁ NO ME PARECE MAL PERO TENIA MIENDO QUE ENTRE EN CONFLICTO CON OTRAS RUTAS YA CREADAS SI LO HACIA
orderRouter.get('/:id', controller.findOne);
//orderRouter.post('/', controller.add);
orderRouter.put('/:id', controller.update);
orderRouter.delete('/:id', controller.remove);