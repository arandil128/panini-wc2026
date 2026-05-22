const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');

const router = Router();
const prisma = new PrismaClient();

// GET /api/sections — todas las secciones con progreso
router.get('/', async (req, res, next) => {
  try {
    const sections = await prisma.section.findMany({
      orderBy: { order: 'asc' },
      include: {
        stickers: {
          select: { id: true, collectionEntry: { select: { id: true } } },
        },
      },
    });

    const result = sections.map(s => ({
      id: s.id,
      name: s.name,
      order: s.order,
      total: s.stickers.length,
      owned: s.stickers.filter(st => st.collectionEntry !== null).length,
    }));

    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

// GET /api/sections/:id/stickers — figuritas de una sección con estado
router.get('/:id/stickers', async (req, res, next) => {
  try {
    const section = await prisma.section.findUnique({
      where: { id: req.params.id.toUpperCase() },
      include: {
        stickers: {
          orderBy: { number: 'asc' },
          include: {
            collectionEntry: true,
            duplicate: true,
          },
        },
      },
    });

    if (!section) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }

    const stickers = section.stickers.map(s => ({
      id: s.id,
      number: s.number,
      playerName: s.playerName,
      description: s.description,
      isSpecial: s.isSpecial,
      isBadge: s.isBadge,
      isTeamPhoto: s.isTeamPhoto,
      pasted: s.collectionEntry !== null,
      pastedAt: s.collectionEntry?.pastedAt ?? null,
      duplicates: s.duplicate?.quantity ?? 0,
    }));

    res.json({
      data: {
        id: section.id,
        name: section.name,
        order: section.order,
        stickers,
      },
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/sections/:sectionId/stickers/:stickerId/name
router.patch('/:sectionId/stickers/:stickerId/name', async (req, res, next) => {
  try {
    const { playerName } = req.body;
    const sticker = await prisma.sticker.update({
      where: { id: req.params.stickerId.toUpperCase() },
      data: { playerName: playerName || null },
    });
    res.json({ data: sticker });
  } catch (err) {
    next(err);
  }
});

module.exports = router;