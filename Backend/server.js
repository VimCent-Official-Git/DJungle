const app = require('./app');
const { db } = require('./models');
const PORT = process.env.PORT || 5000;

// Autenticar y sincronizar la base de datos
db.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos establecida');
    return db.sync({ force: false }); // Cambiar a true en desarrollo para resetear la DB
  })
  .then(() => {
    console.log('✅ Modelos sincronizados');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error de conexión a la base de datos:', err);
  });