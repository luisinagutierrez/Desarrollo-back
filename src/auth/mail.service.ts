import * as nodemailer from 'nodemailer';
import {config} from 'dotenv'

export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const mailOptions = {
      from: 'chiacoriluli@gmail.com',
      to: to,
      subject: 'Reestablecer la contraseña',
      text: `ACA HAY Q PONER EL TEMA DEL CÓDIGO O QUE INGRESE UNA NUEVA CONTRASEÑA`
    };

    await this.transporter.sendMail(mailOptions);
  }
}
