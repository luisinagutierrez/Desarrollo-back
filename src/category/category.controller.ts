import express, { Request, Response, NextFunction } from 'express';
import { Category } from './category.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response){
  try{
    const categories = await em.find(Category, {});
    res.status(200).json({message:'found all categories',data: categories});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function findOne(req: Request, res: Response){
  try{
  const id = req.params.id;
  const category = await em.findOneOrFail(Category, {id});
  res
    .status(200)
    .json({message: 'found one category', data: category});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function add(req: Request, res: Response){
  try{
    const category = em.create(Category, req.body);
    await em.flush();
    res
      .status(201)
      .json({message:'category created',data: category});  
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};
  
  async function update(req: Request, res: Response){
    try{
      const id = req.params.id;
      const category = em.getReference(Category, id);
      em.assign(category, req.body);
      await em.flush();
      res
        .status(200)
        .json({message: 'category updated', data: category});
    }
    catch (error: any) {
      res.status(500).json({message: error.message});
    }
  };
  
 async function remove(req: Request, res: Response){
  try{
    const id = req.params.id;
    const category = em.getReference(Category, id);
    await em.removeAndFlush(category);
    res
      .status(200)
      .json({message: 'category deleted', data: category});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
};
  
  export const controller = {  
    findAll, 
    findOne,
    add,
    update,
    remove
  };
