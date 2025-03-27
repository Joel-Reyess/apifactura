const User = require('../models/user.js');
const bcrypt = require('bcryptjs'); // Usa bcryptjs
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    const { nombreusuario, correousuario, password } = req.body;

    try {
      // Verificar si el usuario ya existe
      User.findByEmail(correousuario, (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
          return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        // Hash de la contraseña
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          // Crear el usuario
          User.create({ nombreusuario, correousuario, password: hash }, (err, result) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Usuario registrado correctamente' });
          });
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const { correousuario, password } = req.body;
  
    //console.log("Datos recibidos en el backend:", { correousuario, password });
  
    try {
      // Buscar el usuario por correo electrónico
      User.findByEmail(correousuario, (err, results) => {
        if (err) {
          //console.error("Error al buscar el usuario:", err);
          return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
          //console.log("Usuario no encontrado");
          return res.status(400).json({ error: 'Credenciales inválidas' });
        }
  
        const user = results[0];
        console.log("Usuario encontrado:", user);
  
        // Verificar la contraseña
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error("Error al comparar contraseñas:", err);
            return res.status(500).json({ error: err.message });
          }
          if (!result) {
            console.log("Contraseña incorrecta");
            return res.status(400).json({ error: 'Credenciales inválidas' });
          }
  
          // Generar un token JWT
          const token = jwt.sign({ id: user.idusuario, correousuario: user.correousuario }, 'tu_secreto_jwt', { expiresIn: '1h' });
          //console.log("Token generado:", token);
  
          // Devuelve el token en la respuesta
          res.json({ token });
        });
      });
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;