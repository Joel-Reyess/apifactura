const express = require('express');
const folderController = require('../controllers/folderController.js');
const router = express.Router();

router.post('/folders', folderController.uploadFolder);
router.get('/folders', folderController.getFolders);
router.delete('/folders/:id', folderController.deleteFolder);

module.exports = router;