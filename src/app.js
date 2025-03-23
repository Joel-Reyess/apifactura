const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const documentRoutes = require('./routes/documentRoutes.js');
const connection = require('./config/db.js');
const folderRoutes = require('./routes/folderRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', documentRoutes);
app.use('/api', folderRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
  res.send('API de Facturación funcionando');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

module.exports = app;