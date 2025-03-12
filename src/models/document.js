const connection = require ('../config/db.js');

const Document = {
  create: (documentData, callback) => {
    const query = `
      INSERT INTO documentos (nombredocumento, rutadocumento, tipodocumento, tamanodocumento, idcarpeta)
      VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(query, [
      documentData.nombredocumento,
      documentData.rutadocumento,
      documentData.tipodocumento,
      documentData.tamanodocumento,
      documentData.idcarpeta || null
    ], callback);
  },
  findAll: (callback) => {
    const query = `
      SELECT d.*, c.nombrecarpeta 
      FROM documentos d
      LEFT JOIN carpetas c ON d.idcarpeta = c.idcarpeta
    `;
    connection.query(query, callback);
  },
  updateCarpeta: (iddocumento, idcarpeta, callback) => {
    const query = `
      UPDATE documentos
      SET idcarpeta = ?
      WHERE iddocumento = ?
    `;
    connection.query(query, [idcarpeta, iddocumento], callback);
  },
};

module.exports = Document;