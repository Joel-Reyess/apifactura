const Document = require('../models/document.js');

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
  }
};

module.exports = documentController;