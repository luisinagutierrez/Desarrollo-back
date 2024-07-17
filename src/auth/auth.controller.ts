import { Request, Response } from 'express';
import * as crypto from 'crypto';
import { User } from '../user/user.entity.js';
import { orm } from '../shared/db/orm.js';
import { MailService } from './mail.service.js';

const em = orm.em;
const mailService = new MailService();

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

export const controller = {
  resetPassword
};
