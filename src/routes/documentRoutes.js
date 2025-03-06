const express = ('express');
const documentController = ('../controllers/documentController.js');
const uploadMiddleware = ('../middlewares/fileUpload.js');

const router = express.Router();

router.post('/documentos', uploadMiddleware.single('archivo'), documentController.uploadDocument);
router.get('/documentos', documentController.getDocuments);

module.exports = router;