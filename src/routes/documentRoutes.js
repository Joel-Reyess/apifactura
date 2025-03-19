const express = require('express');
const documentController = require('../controllers/documentController.js');
const uploadMiddleware = require('../middlewares/fileUpload.js');
const router = express.Router();

router.post('/documentos', uploadMiddleware.single('archivo'), documentController.uploadDocument);
router.get('/documentos', documentController.getDocuments);
router.post('/documentos/asignar-carpeta', documentController.asignarCarpeta);
router.get('/documentos/carpeta/:id', documentController.getDocumentosPorCarpeta);
router.delete('/documentos/:id', documentController.deleteDocument);
router.put('/documentos/desasignar/:id', documentController.desasignarDeCarpeta);

module.exports = router;