import { Request, Response } from 'express';
import * as crypto from 'crypto';
import { User } from '../user/user.entity.js';
import { orm } from '../shared/db/orm.js';
import { MailService } from './mail.service.js';

const em = orm.em;
const mailService = new MailService();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
const SECRET_KEY = 'secretkey123456'; // Debe ser una variable de entorno

export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    //const user = await em.findOne(User, { email });
    //if (!user) {
    //  return res.status(404).send('User not found');
    //}

    const token = crypto.randomBytes(20).toString('hex');

    //user.resetPasswordToken = token;
    //user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hora en el futuro

    //await em.persistAndFlush(user);

    // Enviar el correo electrónico
    await mailService.sendPasswordResetEmail(email, token);

    res.send('Password reset email sent');
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
    const findUser = await em.findOne(User, {email: userData.email, password: userData.password});
    if (!findUser){
      res.status(409).send({message: 'Invalid user'});
  } else {
    const resultPassword = userData.password;
    if (resultPassword) {
        const expiresIn = 20;
        const accessToken = jwt.sign({ email: findUser.email, privilege: findUser.privilege }, SECRET_KEY, {expiresIn: expiresIn});
        res.send({ accessToken });
    } else {
        res.status(409).send({message: 'Invalid user'});
    }
  }
  } catch (err) {
    return res.status(500).send('Server error!');
  }
}

export const controller = {
  resetPassword,
  loginUser
};

