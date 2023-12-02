import express, { Request, Response, NextFunction } from 'express';
import { User } from './user.entity.js';
import { orm } from '../shared/db/orm.js';
import jwt from 'jsonwebtoken';
//import bcrypt from 'bcrypt';

const em = orm.em;

async function findAll(req: Request, res: Response){
  try{
    const users = await em.find(User, {});
    res.status(200).json({message:'found all users',data: users});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function findOne(req: Request, res: Response){
  try{
  const id = req.params.id;
  const user = await em.findOneOrFail(User, {id});//
  res
    .status(200)
    .json({message: 'found one user', data: user});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function login(req: Request, res: Response){
  try{
    const user = em.create(User, req.body);
    await em.flush();
    res
      .status(201)
      .json({message:'user created',data: user});  
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};
  
  async function update(req: Request, res: Response){
    try{
      const id = req.params.id;
      const user = em.getReference(User, id);//
      em.assign(user, req.body);
      await em.flush();
      res
        .status(200)
        .json({message: 'user updated', data: user});
    }
    catch (error: any) {
      res.status(500).json({message: error.message});
    }
  };
  
 async function remove(req: Request, res: Response){
  try{
    const id = req.params.id;
    const user = em.getReference(User, id);
    await em.removeAndFlush(user);
    res
      .status(200)
      .json({message: 'user deleted', data: user});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
}

// async function login(req: Request, res: Response){
//   try{
//     const user = await em.findOneOrFail(User, {email: req.body.email});
//     if(!user) 
//     {return res.status(404).send({message: 'User not found!'});}
//     const match = await bcrypt.compare(req.body.password, user.password);
//     if(!match) 
//     {return res.status(401).send({message: 'Invalid password!'});}
//     const token = jwt.sign({userId: user.id}, 'secretKey', {expiresIn: '1h'});
//     res.status(200).json({token});
//   }
//   catch(error: any){
//     res.status(500).json({message: error.message});
//   }
// }

async function forgotPassword(req: Request, res: Response){
  try{
    const user = await em.findOneOrFail(User, {email: req.body.email});
    if(!user)
    {return res.status(404).send({message: 'User not found!'});}
    else
    {
      const password = req.params.password;
      //??

  }}
  catch(error: any){
    res.status(500).json({message: error.message}); 
  }
}
  
  export const controller = {  
    findAll, 
    findOne,
    login,
    update,
    remove,
    //login
  };
