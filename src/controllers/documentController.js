const Document = require('../models/document.js');
const connection = require('../config/db.js');

const documentController = {
  uploadDocument: (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    const documentData = {
      nombredocumento: req.body.nombredocumento,
      rutadocumento: req.file.filename,
      tipodocumento: req.body.tipodocumento,
      tamanodocumento: req.file.size,
      idcarpeta: req.body.idcarpeta || null
    };

    Document.create(documentData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId });
    });
  },
  getDocuments: (req, res) => {
    Document.findAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  asignarCarpeta: (req, res) => {
    const { iddocumento, idcarpeta } = req.body;

    Document.updateCarpeta(iddocumento, idcarpeta, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Archivo asignado a la carpeta correctamente' });
    });
  },
  getDocumentosPorCarpeta: (req, res) => {
    const { id } = req.params;
  
    const query = `
      SELECT * FROM documentos
      WHERE idcarpeta = ?
    `;
  
    connection.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  deleteDocument: (req, res) => {
    const { id } = req.params;

    Document.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Documento no encontrado' });
      }
      res.json({ message: 'Documento eliminado correctamente' });
    });
  },
};

module.exports = documentController;