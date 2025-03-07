const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const documentRoutes = require('./routes/documentRoutes.js');
const connection = require('./config/db.js');
//const folderRoutes = require('./routes/folderRoutes.js');
//const userRoutes = require('./routes/userRoutes.js');

const app = express();

app.use(cors()); // Permite solicitudes desde otros dominios
app.use(bodyParser.json()); // Parsea el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', documentRoutes);
// app.use('/api/carpetas', folderRoutes);
// app.use('/api/usuarios', userRoutes);

app.get('/', (req, res) => {
  res.send('API de Facturación funcionando');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

module.exports = app;