const Document = ('../models/Document.js');

const documentController = {
  uploadDocument: (req, res) => {
    const documentData = {
      nombredocumento: req.body.nombredocumento,
      rutadocumento: req.file.path,
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