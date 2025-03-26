const connection = require('../config/db.js');

const Folder = {
    create: (folderData, callback) => {
        const query = `
        INSERT INTO carpetas (nombrecarpeta)
        VALUES (?)
        `;
        connection.query(query, [folderData.nombrecarpeta], callback);
    },
    findAll: (callback) => {
        const query = `
            SELECT * FROM carpetas
        `;
        connection.query(query, callback);
    },
    delete: (idcarpeta, callback) => {
        const query = `
            DELETE FROM carpetas
            WHERE idcarpeta = ?
        `;
        connection.query(query, [idcarpeta], callback);
    },
};

module.exports = Folder;