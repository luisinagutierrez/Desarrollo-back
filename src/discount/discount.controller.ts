import express, { Request, Response, NextFunction } from 'express';
import { Discount } from './discount.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response){
  try{
    const discounts = await em.find(Discount, {});
    res.status(200).json({message:'found all discounts',data: discounts});
  } catch (error: any) {
    res.status(404).json({message: error.message});
  }
};

async function findOne(req: Request, res: Response){
  try{
  const id = req.params.id;
  const discount = await em.findOneOrFail(Discount, {id});
  res
    .status(200)
    .json({message: 'found one discount', data: discount});
  }
  catch (error: any) {
    res.status(404).json({message: error.message});
  }
};

async function add(req: Request, res: Response){
  try{
    const discount = em.create(Discount, req.body);
    await em.flush();
    res
      .status(201)
      .json({message:'discount created',data: discount});  
  } catch (error: any) {
    res.status(404).json({message: error.message});
  }
};
  
  async function update(req: Request, res: Response){
    try{
      const id = req.params.id;
      const discount = em.getReference(Discount, id);
      em.assign(discount, req.body);
      await em.flush();
      res
        .status(200)
        .json({message: 'discount updated', data: discount});
    }
    catch (error: any) {
      res.status(404).json({message: error.message});
    }
  };
  
 async function remove(req: Request, res: Response){
  try{
    const id = req.params.id;
    const discount = em.getReference(Discount, id);
    await em.removeAndFlush(discount);
    res
      .status(200)
      .json({message: 'discount deleted', data: discount});
  }
  catch (error: any) {
    res.status(404).json({message: error.message});
  }
};
  
  export const controller = {  
    findAll, 
    findOne,
    add,
    update,
    remove
  };
