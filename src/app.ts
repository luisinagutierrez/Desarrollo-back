// pnpm install all 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// process.on('warning', (warning) => {
//   if (warning.name === 'DeprecationWarning' && warning.message.includes('NODE_TLS_REJECT_UNAUTHORIZED')) {
//   } else {
//     console.warn(warning);
//   }
// });

import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction} from 'express';
import { categoryRouter } from './category/category.routes.js'
import { discountRouter } from './discount/discount.routes.js';
import { supplierRouter } from './supplier/supplier.routes.js';
import { provinceRouter } from './province/province.routes.js';
import { userRouter } from './user/user.routes.js';
import { cityRouter } from './city/city.routes.js';
import { orm } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { productRouter } from './product/product.routes.js';
import { authRouter } from './auth/auth.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200'
}));

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
app.use('/api/cities', cityRouter);
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//static route for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((_, res) => {
  return res.status(404).send({message: 'Resource not found!'});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running on http://localhost:3000/');
});