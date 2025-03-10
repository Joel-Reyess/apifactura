const Folder = require('../models/folder.js');

const folderController = {
    uploadFolder: (req, res) => {
        const folderData = {
            nombrecarpeta:req.body.nombrecarpeta,
        };

        Folder.create(folderData, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message});
            }
            res.status(201).json({ id: result.insertId });
        });
    },
    getFolders: (req, res) => {
        Folder.findAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    },
};

module.exports = folderController;