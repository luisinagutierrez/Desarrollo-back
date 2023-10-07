// pnpm instal all 
import express, { Request, Response, NextFunction} from 'express';
import { categoryRouter } from './category/category.routes.js'
import { discountRouter } from './discount/discount.routes.js';
import { supplierRouter } from './supplier/supplier.routes.js';
import { provinceRouter } from './province/province.routes.js';
import { userRouter } from './user/user.routes.js';

//const repository = new CategoryRepository();

const app = express();
app.use(express.json());

app.use('/api/categories', categoryRouter);
app.use('/api/discounts', discountRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/provinces', provinceRouter);
app.use('/api/users', userRouter);


app.use((_, res) => {
  return res.status(404).send({message: 'Resource not found!'});
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});