const connection = require('../config/db.js');

const Folder = {
    create: (folderDate, callback) => {
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
};

module.exports = Folder;