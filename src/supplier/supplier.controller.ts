import { Request, Response, NextFunction } from 'express';
import { Supplier } from './supplier.entity.js';
import { supplierRepository } from './supplier.repository.js';

const repository = new supplierRepository();  

function sanitizeSupplierInput(req: Request, res: Response, next: NextFunction){ 
  
    req.body.sanitizeInput ={
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
    const supplier = await repository.findOne({id});
    if (!supplier) {
      return res.status(404).send({message: 'Supplier not found!'});
    }
    res.json({data: supplier});
};

async function add(req: Request, res: Response){
    const input = req.body.sanitizeInput;
  
    const supplierInput = new Supplier(input.id, input.number, input.businessName, input.phone, input.webPage, input.email); 
  
    const supplier = await repository.add(supplierInput);
    return res.status(201).send({message: 'Supplier created!', data: supplier});  
  
  };
  
async function update(req: Request, res: Response){
    const supplier =repository.update(req.body.id,req.body.sanitizeInput);
  
    if (!supplier) {
      return res.status(404).send({message: 'Supplier not found!'}); //
    }
    return res.status(200).send({message: 'Supplier updated!', data: supplier});  ///
   };
  
async function remove(req: Request, res: Response){
    const id = req.params.id;  //
    const supplier = await repository.delete({id});
    if (!supplier) {
      return res.status(404).send({message: 'Supplier not found!'});
    }else{
      return res.status(200).send({message: 'Supplier deleted!', data: supplier});  
    }
  };
  
  export const controller = { 
    sanitizeSupplierInput, 
    findAll, 
    findOne,
    add,
    update,
    remove
  };



