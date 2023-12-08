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
  const user = await em.findOneOrFail(User, {id});
  res
    .status(200)
    .json({message: 'found one user', data: user});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function update(req: Request, res: Response){
  try{
    const id = req.params.id;
    const user = em.getReference(User, id);
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

async function signUp(req: Request, res: Response) {
  try {
    const userData = req.body;
    const existingUser = await em.findOne(User, { email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Error', error: 'The user already exists' });
    }

    const user = em.create(User, userData);
    await em.flush();

    res.status(201).json({ message: 'User created successfully', data: user });
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

async function findUserByEmail(req: Request, res: Response) {
  try {
    const email = req.params.email;
    const user = await em.findOne(User, { email });

    if (user) {
      res.status(200).json({ message: 'found one user', data: user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
  
  export const controller = {  
    findAll, 
    findOne,
    update,
    remove,
    signUp,
    findUserByEmail
    //login
  };
