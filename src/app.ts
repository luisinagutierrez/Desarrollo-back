// pnpm instal all 
import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
import { categoryRouter } from './category/category.routes.js'
import { discountRouter } from './discount/discount.routes.js';
import { supplierRouter } from './supplier/supplier.routes.js';
import { provinceRouter } from './province/province.routes.js';
import { userRouter } from './user/user.routes.js';
import { cityRouter } from './city/city.routes.js';
import { orm } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';


//const repository = new CategoryRepository();

const app = express();
app.use(express.json());

//luego de los middlewares base
app.use((req: Request, res: Response, next) => {
  RequestContext.create(orm.em, next)
})

//antes de las rutas y middlewares de negocio

app.use('/api/categories', categoryRouter);
app.use('/api/discounts', discountRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/provinces', provinceRouter);
app.use('/api/users', userRouter);
app.use('api/cities', cityRouter);


app.use((_, res) => {
  return res.status(404).send({message: 'Resource not found!'});
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});