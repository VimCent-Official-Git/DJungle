const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const djRoutes = require('./routes/dj.routes');
const clientRoutes = require('./routes/client.routes');

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Middlewares básicos
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar rutas
app.use('/api/auth', authRoutes);
app.use('/api/djs', djRoutes);
app.use('/api/clients', clientRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido al backend de DJungle');
});

// Manejador de errores 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado'
  });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;