import { Request, Response, NextFunction } from 'express';
import { Discount } from './discount.entity.js';
import { DiscountRepository } from './discount.repository.js';

const repository = new DiscountRepository

function sanitizeDiscountInput(req: Request, res: Response, next: NextFunction){ //
    req.body.sanitizeInput ={
      id: req.body.id,
      dataSince: req.body.dataSince,
      amount: req.body.amount,
      discount: req.body.discount,
    }
  
    Object.keys(req.body.sanitizeInput).forEach((key) => {
      if(req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
      });
  
    next();
}

function findAll(req: Request, res: Response){
    res.json({data: repository.findAll()});
};

function findOne(req: Request, res: Response){
    const id = req.params.id;
    const discount = repository.findOne({id});
    if (!discount) {
      return res.status(404).send({message: 'discount not found!'});
    }
    res.json({data: discount});
};

function add(req: Request, res: Response){
    const input = req.body.sanitizeInput;
    const discountInput = new Discount(input.id, input.dataSince, input.amount,input.discount);
  
    const discount = repository.add(discountInput);
    return res.status(201).send({message: 'discount created!', data: discount});  
  
  };
  
  function update(req: Request, res: Response){
    req.body.sanitizeInput.id = req.params.id; 
    const discount =repository.update(req.body.sanitizeInput);
  
    if (!discount) {
      return res.status(404).send({message: 'discount not found!'});
    }
    return res.status(200).send({message: 'discount updated!', data: discount});  
   };
  
  function remove(req: Request, res: Response){
    const id = req.params.id;
    const discount = repository.delete({id});
    if (!discount) {
      return res.status(404).send({message: 'discount not found!'});
    }else{
      return res.status(200).send({message: 'discount deleted!', data: discount});  
    }
  };
  
  export const controller = { 
    sanitizeDiscountInput, 
    findAll, 
    findOne,
    add,
    update,
    remove
  };
