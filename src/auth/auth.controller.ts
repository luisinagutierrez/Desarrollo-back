import { Request, Response } from 'express';
import * as crypto from 'crypto';
import { User } from '../user/user.entity.js';
import { orm } from '../shared/db/orm.js';
import { MailService } from './mail.service.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Loaded } from '@mikro-orm/core';

const em = orm.em;
const mailService = new MailService();
const SECRET_KEY = 'secretkey123456'; // Debe ser una variable de entorno

export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await em.findOne(User, { email });
    if (!user) {
       return res.status(404).send('User not found');
       }

    const token = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hora en el futuro

    await em.persistAndFlush(user);

    // Enviar el correo electrónico
    await mailService.sendPasswordResetEmail(email, token);

    res.status(202).send('Password reset email sent');
    //res.send('Password reset email sent');
  } catch (error: any) {
    console.error('Error in reset password', error);
    res.status(500).send('Internal server error');
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const userData = {
      email: req.body.email,
      password: req.body.password
  }

  try {
    const findUser = await em.findOne(User, { email: userData.email }) as Loaded<User, never>;
    if (!findUser) return res.status(401).send({message: 'Invalid user'});
    const isPasswordValid = await bcrypt.compare(userData.password, findUser.password)

    if (!isPasswordValid) return res.status(401).json({message: 'Credenciales inválidas'});
    
    const expiresIn = 24*60*60;
    const accessToken = jwt.sign({ email: findUser.email, privilege: findUser.privilege }, SECRET_KEY, {expiresIn: expiresIn});
    res.send({ accessToken });
  } catch (err) {
    return res.status(500).send('Server error!');
  }
}

// export const updateEmail = async (req: Request, res: Response) => {
//   const { email } = req.body;
  
//   try {
//     // Verify authorization header
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     // Decode current token
//     const decoded = jwt.verify(token, SECRET_KEY) as any;
    
//     // Create new token with updated email
//     const newToken = jwt.sign(
//       { 
//         email: email, 
//         privilege: decoded.privilege 
//       }, 
//       SECRET_KEY, 
//       { expiresIn: 24*60*60 }
//     );

//     res.json({ token: newToken });
//   } catch (error) {
//     console.error('Error updating email token:', error);
//     res.status(500).json({ message: 'Error updating token' });
//   }
// };

export const controller = {
  resetPassword,
  loginUser,
  //updateEmail
};

