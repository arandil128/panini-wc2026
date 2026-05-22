require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

async function start() {
  // Auto-seed si la DB está vacía
  const count = await prisma.sticker.count();
  if (count === 0) {
    console.log('DB vacía — ejecutando seed...');
    const seed = require('../prisma/seed');
    await seed();
  }

  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error('Error al iniciar:', err);
  process.exit(1);
});