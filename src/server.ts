import app from './app';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Health check disponible en http://localhost:${PORT}/health`);
  console.log(`👥 API de usuarios disponible en http://localhost:${PORT}/users`);
});