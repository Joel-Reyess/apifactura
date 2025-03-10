const express = require('express');
const folderController = require('../controllers/folderController.js');
const router = express.Router();

router.post('/folders', folderController.uploadFolder);
router.get('/folders', folderController.getFolders);

module.exports = router;