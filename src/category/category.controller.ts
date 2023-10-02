import { Request, Response, NextFunction } from 'express';
import { Category} from './category.entity.js';
import { categoryRepository } from './category.repository.js';

const repository = new categoryRepository(); 

function sanitizeCategoryInput(req: Request, res: Response, next: NextFunction){ //
  
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
    const category = await repository.findOne({id});
    if (!category) {
      return res.status(404).send({message: 'category not found!'});
    }
    res.json({data: category});
};

async function add(req: Request, res: Response){
    const input = req.body.sanitizeInput;
  
    const categoryInput = new Category(input.id, input.name); //
  
    const category = await repository.add(categoryInput);
    return res.status(201).send({message: 'Category created!', data: category});  
  
  };
  
async function update(req: Request, res: Response){
    const category =repository.update(req.body.id,req.body.sanitizeInput);
  
    if (!category) {
      return res.status(404).send({message: 'Category not found!'});
    }
    return res.status(200).send({message: 'Category updated!', data: category});  
   };
  
async function remove(req: Request, res: Response){
    const id = req.params.id;  //
    const category = await repository.delete({id});
    if (!category) {
      return res.status(404).send({message: 'Category not found!'});
    }else{
      return res.status(200).send({message: 'Category deleted!', data: category});  
    }
  };
  
  export const controller = { 
    sanitizeCategoryInput, 
    findAll, 
    findOne,
    add,
    update,
    remove
  };



