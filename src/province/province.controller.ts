import express, { Request, Response, NextFunction } from 'express';
import { Province } from './province.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response){
  try{
    const provinces = await em.find(Province, {});
    res.status(200).json({message:'found all provinces',data: provinces});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function findOne(req: Request, res: Response){
  try{
  const id = req.params.id;
  const province = await em.findOneOrFail(Province, {id});
  res
    .status(200)
    .json({message: 'found one Province', data: province});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function add(req: Request, res: Response){
  try{
    const province = em.create(Province, req.body);
    await em.flush();
    res
      .status(201)
      .json({message:'Province created',data: Province});  
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};
  
  async function update(req: Request, res: Response){
    try{
      const id = req.params.id;
      const province = em.getReference(Province, id);
      em.assign(province, req.body);
      await em.flush();
      res
        .status(200)
        .json({message: 'Province updated', data: province});
    }
    catch (error: any) {
      res.status(500).json({message: error.message});
    }
  };
  
 async function remove(req: Request, res: Response){
  try{
    const id = req.params.id;
    const province = em.getReference(Province, id);
    await em.removeAndFlush(province);
    res
      .status(200)
      .json({message: 'Province deleted', data: province});
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
