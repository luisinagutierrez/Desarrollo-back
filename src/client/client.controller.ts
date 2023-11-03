import express, { Request, Response, NextFunction } from 'express';
import { Client } from './client.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response){
  try{
    const clients = await em.find(Client, {}); //
    res.status(200).json({message:'found all clients',data: clients});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function findOne(req: Request, res: Response){
  try{
  const id = req.params.id;
  const client = await em.findOneOrFail(Client, {id});//
  res
    .status(200)
    .json({message: 'found one client', data: client});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function add(req: Request, res: Response){
  try{
    const client = em.create(Client, req.body);//
    await em.flush();
    res
      .status(201)
      .json({message:'client created',data: client});  
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};
  
  async function update(req: Request, res: Response){
    try{
      const id = req.params.id;
      const client = em.getReference(Client, id);//
      em.assign(client, req.body);
      await em.flush();
      res
        .status(200)
        .json({message: 'client updated', data: client});
    }
    catch (error: any) {
      res.status(500).json({message: error.message});
    }
  };
  
 async function remove(req: Request, res: Response){
  try{
    const id = req.params.id;
    const client = em.getReference(Client, id);
    await em.removeAndFlush(client);
    res
      .status(200)
      .json({message: 'client deleted', data: client});
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
