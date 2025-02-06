import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const clientPort = process.env.CLIENT_PORT || 4200
const urlFront = `http://localhost:${clientPort}`;

const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});

/**
 * Email de recuperación de contraseña.
 * Lo hago con https://mailtrap.io/
 * @param {string} toEmail - Email del destinatario.
 * @param {string} resetToken - Token de restablecimiento.
 */
const sendPasswordResetEmail = async (toEmail, resetToken) => {
    const resetUrl = `${urlFront}/reset-password?token=${resetToken}`;

    
    const mailOptions = {
        from: '"Soporte" <soporte@editoriapp.com>',
        to: toEmail,
        subject: "Recuperación de Contraseña",
        html: `
            <h3>Hola,</h3>
            <p>Solicitaste restablecer tu contraseña.</p>
            <p>Hace clic en el siguiente enlace para continuar:</p>
            <a href="${resetUrl}" style="padding: 10px; background-color: #007BFF; color: white; text-decoration: none;">Restablecer Contraseña</a>
            <p>Si no solicitaste esto, ignora este mensaje.</p>
            <p>Saludos,</p>
            <p><strong>Equipo de Soporte de EditoriApp</strong></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a: ${toEmail}`);
    } catch (error) {
        console.error("Error al enviar el email:", error);
        throw new Error("No se pudo enviar el email.");
    }
};

export { sendPasswordResetEmail };