import { Request, Response, NextFunction } from 'express';
import { User } from './user.entity.js';
import { userRepository } from './user.repository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer, { SentMessageInfo } from 'nodemailer';

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
  
    const userInput = new User(input.id, input.email,input.password, input.privilege, input.resetPasswordToken, input.resetPasswordExpires); //
  
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

async function login(req: Request, res: Response){
  const {email, password} = req.body;
  try{
    const user = await repository.findOneByEmail({email});
    if(!user) return res.status(404).send({message: 'User not found!'});
  
    const match = await bcrypt.compare(password, user.password);  

    if (!match) return res.status(401).send({message: 'Invalid password!'});  

    const token = jwt.sign({userId: user._id}, 'secretKey', {expiresIn: '1h'}); 

    res.status(200).json({token});}
  catch(err){
    res.status(500).json({err: 'Login error!'});
  }
}

async function forgotPassword(req: Request, res: Response){
  const {email} = req.body;

  try{
    const user = await repository.findOneByEmail({email});  
    if(!user) return res.status(404).send({message: 'User not found!'});  
    const token = crypto.randomBytes(20).toString('hex'); 
    const now = new Date();
    now.setHours(now.getHours() + 1);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = now;
    await repository.update(user._id.toString(), user);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth:{
        user: 'email',
        pass: 'password'
      }, 
    })
    const mailOptions = {
      from: 'email',
      to: user.email,
      subject: 'Reset password',
      text: `To reset your password, please click on the following link: \n\n
      http://localhost:3000/reset-password/${token} \n\n
      If you did not request this, please ignore this email and your password will remain unchanged.`
    }
    transporter.sendMail(mailOptions, (err:Error | null, info: SentMessageInfo) => {
      if(err) return res.status(500).send({message: 'Error on send email!'});
      return res.status(200).send({message: 'Email sent!'});
    });
  }catch(err){
    res.status(500).json({err: 'Forgot password error!'});  
  }
}

  export const controller = { 
    sanitizeUserInput, 
    findAll, 
    findOne,
    add,
    update,
    remove,
    login
  };



