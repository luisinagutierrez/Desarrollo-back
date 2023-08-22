import express, { Request, Response, NextFunction } from 'express';
import {Products } from './products';

const app = express();

const products: Products[] = [
  new Products (1, 'Cartera rosa', 3, 130,'Lover', 20615243740,1)
];

function sanitizeProductInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizeInput ={
    description: req.body.description,
    stock: req.body.stock,
    measures: req.body.measures,
    name: req.body.name,
    cuit: req.body.cuit,
    categoryCode: req.body.categoryCode,
  }
  //more checks here

  Object.keys(req.body.sanitizeInput).forEach((key) => {
    if(req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
    });

  next();

  };

app.get('/api/product', (req, res) => {
  res.json({data: products});
});

app.use('/', (req, res) => {
  res.json({message: '<h1>Hello World!</h1>'});
});

app.get('/api/product/:productCode', (req, res) => {
  const product = products.find((product) => product.productCode === parseInt(req.params.productCode));
  if (!product) {
    return res.status(404).send({message: 'Product not found!'});
  }
  res.json({data: product});
});

app.post('/api/product', sanitizeProductInput, (req, res) => {
  const input = req.body.sanitizeProductInput;

  const newProduct = new Products(
    input.productCode, //tira error si saco el id, tengo que sacarlo del constructor o hacer otra cosa? Ask Meca
    input.name, 
    input.description,
    input.stock, 
    input.material, 
    input.categoryId, 
    input.cuil);

  products.push(newProduct);
  return res.status(201).json({message: 'Product inserted.', data: newProduct});
});

app.put('/api/product/:productCode',  sanitizeProductInput,(req, res) => {
  const productCodex = products.findIndex((product) => product.productCode === parseInt(req.params.productCode));

  if(productCodex === -1){
    return res.status(404).send({message: 'Product not found!'});
  }
  const {name, description, stock, material, categoryId, cuil} = req.body;
  products[productCodex] = {...products[productCodex], ...req.body.sanitizeInput};
  res.status(200).json({message: 'Product updated successfully.', data: products[productCodex]});
});

app.patch('/api/product/:productCode',  sanitizeProductInput,(req, res) => {
  const productCodex = products.findIndex((product) => product.productCode === parseInt(req.params.productCode));

  if(productCodex === -1){
    return res.status(404).send({message: 'Product not found!'});
  }
  const {name, description, stock, material, categoryId, cuil} = req.body;
  products[productCodex] = {...products[productCodex], ...req.body.sanitizeInput};
  res.status(200).json({message: 'Product updated successfully.', data: products[productCodex]});
});

app.delete('/api/product/:productCode', (req, res) => {
  const productCodex = products.findIndex((product) => product.productCode === parseInt(req.params.productCode));

  if(productCodex === -1){
    return res.status(404).send({message: 'Product not found!'});
  }else{
  products.splice(productCodex, 1);
  res.status(200).json({message: 'Product deleted successfully.'});
}});

app.use((_, res) => {
  return res.status(404).send({message: 'Resource not found!'});
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});