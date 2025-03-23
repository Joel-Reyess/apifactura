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
};

module.exports = User;