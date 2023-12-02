import express, { Request, Response, NextFunction } from 'express';
import { Supplier } from './supplier.entity.js';
import { orm } from '../shared/db/orm.js';
import { Product } from '../product/product.entity.js';	


const em = orm.em;

async function findAll(req: Request, res: Response){
  try{
    const cities = await em.find(Supplier, {});
    res.status(200).json({message:'found all cities',data: cities});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function findOne(req: Request, res: Response){
  try{
  const id = req.params.id;
  const supplier = await em.findOneOrFail(Supplier, {id});
  res
    .status(200)
    .json({message: 'found one supplier', data: supplier});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function add(req: Request, res: Response){
  try{
    const supplier = em.create(Supplier, req.body);
    await em.flush();
    res
      .status(201)
      .json({message:'supplier created',data: supplier});  
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};
  
  async function update(req: Request, res: Response){
    try{
      const id = req.params.id;
      const supplier = em.getReference(Supplier, id);
      em.assign(supplier, req.body);
      await em.flush();
      res
        .status(200)
        .json({message: 'supplier updated', data: supplier});
    }
    catch (error: any) {
      res.status(500).json({message: error.message});
    }
  };
  
 async function remove(req: Request, res: Response){
  try{
    const id = req.params.id;
    const supplier = em.getReference(Supplier, id);
    await em.removeAndFlush(supplier);
    res
      .status(200)
      .json({message: 'supplier deleted', data: supplier});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
}

async function findProductsBySupplier(req: Request, res: Response){
  try{
    const cuit = Number(req.params.cuit);
    console.log(cuit);
    const supplier = await em.findOneOrFail(Supplier, {cuit: cuit});
    //console.log(supplier);
    const products = await em.find(Product, {supplier: supplier});
    //console.log(products.length);

    res
      .status(200)
      .json({message: 'found products by supplier', data: products});

  }catch (error: any) {
    res.status(500).json({message: error.message});
  }
};
  export const controller = {  
    findAll, 
    findOne,
    add,
    update,
    remove,
    findProductsBySupplier
  };
