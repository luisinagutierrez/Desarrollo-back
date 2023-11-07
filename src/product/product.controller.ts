import express, { Request, Response, NextFunction } from 'express';
import { Product } from './product.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response){
  try{
    const products = await em.find(Product, {});
    res.status(200).json({message:'found all products',data: products});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function findOne(req: Request, res: Response){
  try{
  const id = req.params.id;
  const product = await em.findOneOrFail(Product, {id});//
  res
    .status(200)
    .json({message: 'found one product', data: product});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function add(req: Request, res: Response){
  try{
    const product = em.create(Product, req.body);//
    await em.flush();
    res
      .status(201)
      .json({message:'product created',data: product});  
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};
  
  async function update(req: Request, res: Response){
    try{
      const id = req.params.id;
      const product = em.getReference(Product, id);//
      em.assign(product, req.body);
      await em.flush();
      res
        .status(200)
        .json({message: 'product updated', data: product});
    }
    catch (error: any) {
      res.status(500).json({message: error.message});
    }
  };
  
 async function remove(req: Request, res: Response){
  try{
    const id = req.params.id;
    const product = em.getReference(Product, id);
    await em.removeAndFlush(product);
    res
      .status(200)
      .json({message: 'product deleted', data: product});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
}

async function listByCategory(req: Request, res: Response){
  try{
    const category = req.params.category;
    const products = await em.find(Product, {category});
    res.status(200).json({message:'found all products',data: products});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
}

async function searchProducts(req: Request, res: Response){
  const searchTerm = req.params.searchTerm;

  try{
    const products = await em.find(Product, { description: new RegExp(searchTerm, 'i') }); // i = case insensitive
  
  if(!products || products.length === 0){
    res.status(404).json({message: 'No products found'});
  }
  else{
    res.status(200).json({message: 'found products', data: products});
  }
} catch (error: any) {
  res.status(500).json({message: error.message});
}
}

async function orderProductStock(req: Request, res: Response){
  const cart = req.body.cart;
  const {products} = cart;
  try{
    for (const product of products) {
      const productToUpdate = await em.findOneOrFail(Product, {id: product.id});
      productToUpdate.stock -= product.quantity;
      await em.flush();
    }
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
}
  
  export const controller = {  
    findAll, 
    findOne,
    add,
    update,
    remove,
    listByCategory,
    searchProducts,
    orderProductStock
  };
