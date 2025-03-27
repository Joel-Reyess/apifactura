const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const passwordController = {
    forgotPassword: (req, res) => {
        const { correousuario } = req.body;
    
        if (!correousuario) {
            return res.status(400).json({ error: 'El correo electrónico es requerido' });
        }
    
        User.findByEmail(correousuario, (err, results) => {
            if (err) {
                console.error('Error al buscar usuario:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            
            if (results.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            const user = results[0];
            const token = crypto.randomBytes(20).toString('hex');
            const expiration = new Date(Date.now() + 3600000); // 1 hora
    
            User.setResetToken(correousuario, token, expiration, (err) => {
                if (err) {
                    console.error('Error al establecer token:', err);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }
    
                const resetUrl = `http://localhost:8080/reset-password/${token}`;
                
                const mailOptions = {
                    to: correousuario,
                    from: process.env.GMAIL_USER,
                    subject: 'Recuperación de contraseña - Pasteles de Gaby',
                    html: `
                        <p>Hola ${user.nombreusuario},</p>
                        <p>Has solicitado restablecer tu contraseña para Pasteles de Gaby.</p>
                        <p>Por favor haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                        <p><a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a></p>
                        <p>Si no solicitaste este cambio, por favor ignora este correo.</p>
                        <p>El enlace expirará en 1 hora.</p>
                    `
                };
    
                transporter.sendMail(mailOptions, (err) => {
                    if (err) {
                        console.error('Error al enviar correo:', err);
                        return res.status(500).json({ error: 'Error al enviar el correo' });
                    }
                    res.json({ message: 'Se ha enviado un correo con instrucciones' });
                });
            });
        });
    },
  resetPassword: (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    User.findByResetToken(token, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(400).json({ error: 'Token inválido o expirado' });

      const user = results[0];

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err.message });

        User.updatePassword(user.idusuario, hash, (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: 'Contraseña actualizada correctamente' });
        });
      });
    });
  }
};

module.exports = passwordController;