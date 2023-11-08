// import pkg from 'jsonwebtoken';
// import {config} from 'dotenv';
// import { NextFunction } from 'express';
// import { User } from '../user/user.entity.js';


// config();

// const jwt = pkg;

// const secret = process.env.SECRET;

// export const generateToken = (user: User) =>{
//   if (secret) {
//     return jwt.sign(user, secret, {expiresIn: '10m'});
//   } else {
//     throw new Error('Secret not found');
//   }
//   }

// export const validateToken = (req: Request, res: Response, next: NextFunction) =>{
//   const authHeader = req.headers['authorization'];

// if(authHeader){
//   const token = authHeader.split(' ')[1];
//   jwt.verify(token, secret, (err, user) =>{
//     if(err){
//       return res.status(401).json('Token inválido'  );
//     } else{
//       next();
//     }
//   });
// } else{
//   return res.status(401).json('Token no proporcionado');
// }
// }