const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const { parseCodes } = require('../utils/codeParser');

const router = Router();
const prisma = new PrismaClient();

// GET /api/collection/stats
router.get('/stats', async (req, res, next) => {
  try {
    const total = await prisma.sticker.count();
    const owned = await prisma.collectionEntry.count();

    const sections = await prisma.section.findMany({
      orderBy: { order: 'asc' },
      include: {
        stickers: {
          select: { id: true, collectionEntry: { select: { id: true } } },
        },
      },
    });

    const bySection = sections.map(s => ({
      id: s.id,
      name: s.name,
      order: s.order,
      total: s.stickers.length,
      owned: s.stickers.filter(st => st.collectionEntry !== null).length,
    }));

    res.json({ data: { total, owned, pct: total > 0 ? Math.round((owned / total) * 100) : 0, bySection } });
  } catch (err) {
    next(err);
  }
});

// GET /api/collection/missing
router.get('/missing', async (req, res, next) => {
  try {
    const stickers = await prisma.sticker.findMany({
      where: { collectionEntry: null },
      orderBy: [{ section: { order: 'asc' } }, { number: 'asc' }],
      include: { section: { select: { name: true, order: true } } },
    });

    res.json({
      data: stickers.map(s => ({
        id: s.id,
        sectionId: s.sectionId,
        sectionName: s.section.name,
        number: s.number,
        playerName: s.playerName,
        description: s.description,
      })),
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/collection — pegar figuritas en lote { codes: ["ARG17", ...] }
router.post('/', async (req, res, next) => {
  try {
    const rawCodes = req.body.codes || [];
    const codes = parseCodes(rawCodes.join(' '));

    if (!codes.length) {
      return res.status(400).json({ error: 'No se enviaron códigos válidos' });
    }

    // Verificar que existen en el catálogo
    const found = await prisma.sticker.findMany({
      where: { id: { in: codes } },
      select: { id: true },
    });
    const validIds = found.map(s => s.id);
    const invalid = codes.filter(c => !validIds.includes(c));

    // Upsert: si ya existe CollectionEntry, no hace nada; si no, la crea
    await prisma.$transaction(
      validIds.map(id =>
        prisma.collectionEntry.upsert({
          where: { stickerId: id },
          update: {},
          create: { stickerId: id },
        })
      )
    );

    res.json({ data: { pasted: validIds, invalid } });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/collection/:stickerId — desmarcar figurita
router.delete('/:stickerId', async (req, res, next) => {
  try {
    const id = req.params.stickerId.toUpperCase();
    await prisma.collectionEntry.deleteMany({ where: { stickerId: id } });
    res.json({ data: { removed: id } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;