import { Request, Response, NextFunction } from 'express';
import { Discount } from './discount.entity.js';
import { discountRepository } from './discount.repository.js';

const repository = new discountRepository(); 

function sanitizeDiscountInput(req: Request, res: Response, next: NextFunction){ //
  
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
    const discount = await repository.findOne({id});
    if (!discount) {
      return res.status(404).send({message: 'Discount not found!'});
    }
    res.json({data: discount});
};

async function add(req: Request, res: Response){
    const input = req.body.sanitizeInput;

    const discountInput = new Discount(input.id, input.dateSince, input.amount, input.discount  ); //
  
    const discount = await repository.add(discountInput);
    return res.status(201).send({message: 'Discount created!', data: discount});  
  
  };
  
async function update(req: Request, res: Response){
    const discount =repository.update(req.body.id,req.body.sanitizeInput);
  
    if (!discount) {
      return res.status(404).send({message: 'Discount not found!'});
    }
    return res.status(200).send({message: 'Discount updated!', data: discount});  
   };
  
async function remove(req: Request, res: Response){
    const id = req.params.id;  //
    const discount = await repository.delete({id});
    if (!discount) {
      return res.status(404).send({message: 'Discount not found!'});
    }else{
      return res.status(200).send({message: 'Discount deleted!', data: discount});  
    }
  };
  
  export const controller = { 
    sanitizeDiscountInput,  ////
    findAll, 
    findOne,
    add,
    update,
    remove
  };


