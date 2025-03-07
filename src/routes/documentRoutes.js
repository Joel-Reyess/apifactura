const express = require('express');
const documentController = require('../controllers/documentController.js');
const uploadMiddleware = require('../middlewares/fileUpload.js');

const router = express.Router();

// Ruta para subir documentos
router.post('/documentos', uploadMiddleware.single('archivo'), documentController.uploadDocument);

// Ruta para obtener documentos
router.get('/documentos', documentController.getDocuments);

module.exports = router;