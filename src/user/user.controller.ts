import { Request, Response, NextFunction } from 'express';
import { User } from './user.entity.js';
import { userRepository } from './user.repository.js';

const repository = new userRepository(); //

function sanitizeUserInput(req: Request, res: Response, next: NextFunction){ //
  
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
    const user = await repository.findOne({id});
    if (!user) {
      return res.status(404).send({message: 'user not found!'});
    }
    res.json({data: user});
};

async function add(req: Request, res: Response){
    const input = req.body.sanitizeInput;
  
    const userInput = new User(input.id, input.email,input.password, input.privilege); //
  
    const user = await repository.add(userInput);
    return res.status(201).send({message: 'user created!', data: user});  
  
  };
  
async function update(req: Request, res: Response){
    const user =repository.update(req.body.id,req.body.sanitizeInput);
  
    if (!user) {
      return res.status(404).send({message: 'User not found!'});
    }
    return res.status(200).send({message: 'User updated!', data: user});  
   };
  
async function remove(req: Request, res: Response){
    const id = req.params.id;  
    const user = await repository.delete({id});
    if (!user) {
      return res.status(404).send({message: 'User not found!'});
    }else{
      return res.status(200).send({message: 'User deleted!', data: user});  
    }
  };
  
  export const controller = { 
    sanitizeUserInput, 
    findAll, 
    findOne,
    add,
    update,
    remove
  };



