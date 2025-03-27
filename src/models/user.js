const connection = require('../config/db.js');

const User = {
  create: (userData, callback) => {
    const query = `
      INSERT INTO usuarios (nombreusuario, correousuario, password)
      VALUES (?, ?, ?)
    `;
    connection.query(query, [userData.nombreusuario, userData.correousuario, userData.password], callback);
  },
  findByEmail: (correousuario, callback) => {
    const query = `
      SELECT * FROM usuarios
      WHERE correousuario = ?
    `;
    connection.query(query, [correousuario], callback);
  },
  setResetToken: (correousuario, token, expiration, callback) => {
    const query = `
      UPDATE usuarios
      SET reset_token = ?, reset_expires = ?
      WHERE correousuario = ?
    `;
    connection.query(query, [token, expiration, correousuario], callback);
  },

  findByResetToken: (token, callback) => {
    const query = `
      SELECT * FROM usuarios
      WHERE reset_token = ? AND reset_expires > NOW()
    `;
    connection.query(query, [token], callback);
  },

  updatePassword: (idusuario, password, callback) => {
    const query = `
      UPDATE usuarios
      SET password = ?, reset_token = NULL, reset_expires = NULL
      WHERE idusuario = ?
    `;
    connection.query(query, [password, idusuario], callback);
  }
};

module.exports = User;