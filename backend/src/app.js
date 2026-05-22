const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const sectionsRouter = require('./routes/sections');
const collectionRouter = require('./routes/collection');
const duplicatesRouter = require('./routes/duplicates');
const exportRouter = require('./routes/export');
const ocrRouter = require('./routes/ocr');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// API routes
app.use('/api/sections', sectionsRouter);
app.use('/api/collection', collectionRouter);
app.use('/api/duplicates', duplicatesRouter);
app.use('/api/export', exportRouter);
app.use('/api/ocr', ocrRouter);

// Sticker name edit
app.patch('/api/stickers/:id/name', async (req, res, next) => {
  try {
    const sticker = await prisma.sticker.update({
      where: { id: req.params.id.toUpperCase() },
      data: { playerName: req.body.playerName || null },
    });
    res.json({ data: sticker });
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

// Servir el frontend en producción (después del errorHandler para que los errores API no caigan aquí)
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;
