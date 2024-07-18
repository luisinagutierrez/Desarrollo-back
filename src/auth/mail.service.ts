import * as nodemailer from 'nodemailer';

export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: 'chiacoriluli@gmail.com',
        pass: 'ouivatjlcduazbcq'
      }
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const frontendUrl = 'http://localhost:4200/UserRegistration/new-password';
    const resetUrl = `${frontendUrl}/${token}`;
    const mailOptions = {
      from: 'chiacoriluli@gmail.com',
      to: to,
      subject: 'Reestablecer la contraseña',
      html: `
        <h1>Reestablecer la contraseña</h1>
        <p>Has solicitado reestablecer tu contraseña. Haz clic en el botón de abajo para cambiarla:</p>
        <a href="${frontendUrl}?token=${token}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Cambiar/actualizar contraseña</a>
        <p>Si no has solicitado este cambio, puedes ignorar este correo.</p>
      `
    };

    await this.transporter.sendMail(mailOptions);
  }
}
