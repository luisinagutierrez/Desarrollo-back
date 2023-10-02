import express, { Request, Response, NextFunction } from 'express';
import { provinceRepository } from './province.repository.js';
import { Province } from './province.entity.js';

const repository = new provinceRepository(); 

function sanitizeProvinceInput(req: Request, res: Response, next: NextFunction){
  
    req.body.sanitizeInput ={
      //suppliers: req.body.id,
      id: req.body.id,
      name: req.body.name,
    }
    //more checks here
  
    Object.keys(req.body.sanitizeInput).forEach((key) => {
      if(req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
      });
  
    next();
}

async function findAll(req: Request, res: Response){
    res.json({data: await repository.findAll()});
};

async function findOne(req: Request, res: Response){
    const id = req.params.id;
    const province = await repository.findOne({id});
    if (!province) {
      return res.status(404).send({message: 'Province not found!'});
    }
    res.json({data: province});
};

async function add(req: Request, res: Response){
    const input = req.body.sanitizeInput;
  
    const provinceInput = new Province(input.id, input.name);
  
    const province = await repository.add(provinceInput);
    return res.status(201).send({message: 'Province created!', data: province});  
  
  };
  
  async function update(req: Request, res: Response){
    const province = await repository.update(req.params.id,req.body.sanitizeInput);
  
    if (!province) {
      return res.status(404).send({message: 'Province not found!'});
    }
    return res.status(200).send({message: 'Province updated!', data: province});  
   };
  
 async function remove(req: Request, res: Response){
    const id = req.params.id;
    const province = await repository.delete({id});
    if (!province) {
      return res.status(404).send({message: 'Province not found!'});
    }else{
      return res.status(200).send({message: 'Province deleted!', data: province});  
    }
  };
  
  export const controller = { 
    sanitizeProvinceInput, 
    findAll, 
    findOne,
    add,
    update,
    remove
  };
