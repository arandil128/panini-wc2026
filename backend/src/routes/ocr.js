const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const upload = require('../middleware/upload');
const { processImage } = require('../services/ocrService');

const router = Router();
const prisma = new PrismaClient();

let catalogSet = null;

async function getCatalogSet() {
  if (!catalogSet) {
    const stickers = await prisma.sticker.findMany({ select: { id: true } });
    catalogSet = new Set(stickers.map(s => s.id));
  }
  return catalogSet;
}

// POST /api/ocr — recibe imagen, devuelve códigos detectados
router.post('/', upload.single('image'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió ninguna imagen' });
  }

  try {
    const catalog = await getCatalogSet();
    const result = await processImage(req.file.path, catalog);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
