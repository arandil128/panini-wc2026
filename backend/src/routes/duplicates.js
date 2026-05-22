const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');

const router = Router();
const prisma = new PrismaClient();

// GET /api/duplicates
router.get('/', async (req, res, next) => {
  try {
    const dups = await prisma.duplicate.findMany({
      orderBy: [{ sticker: { section: { order: 'asc' } } }, { sticker: { number: 'asc' } }],
      include: {
        sticker: {
          include: { section: { select: { name: true, order: true } } },
        },
      },
    });

    res.json({
      data: dups.map(d => ({
        id: d.id,
        stickerId: d.stickerId,
        quantity: d.quantity,
        playerName: d.sticker.playerName,
        description: d.sticker.description,
        sectionId: d.sticker.sectionId,
        sectionName: d.sticker.section.name,
        number: d.sticker.number,
      })),
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/duplicates — upsert { stickerId, quantity }
router.post('/', async (req, res, next) => {
  try {
    const { stickerId, quantity } = req.body;
    const id = stickerId?.toUpperCase();
    const qty = parseInt(quantity, 10);

    if (!id || isNaN(qty) || qty < 0) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    if (qty === 0) {
      await prisma.duplicate.deleteMany({ where: { stickerId: id } });
      return res.json({ data: { stickerId: id, quantity: 0 } });
    }

    const dup = await prisma.duplicate.upsert({
      where: { stickerId: id },
      update: { quantity: qty },
      create: { stickerId: id, quantity: qty },
    });

    res.json({ data: dup });
  } catch (err) {
    next(err);
  }
});

// PUT /api/duplicates/:stickerId — delta +/-
router.put('/:stickerId', async (req, res, next) => {
  try {
    const id = req.params.stickerId.toUpperCase();
    const delta = parseInt(req.body.delta, 10);
    if (isNaN(delta)) return res.status(400).json({ error: 'Delta inválido' });

    const existing = await prisma.duplicate.findUnique({ where: { stickerId: id } });
    const newQty = Math.max(0, (existing?.quantity ?? 0) + delta);

    if (newQty === 0) {
      await prisma.duplicate.deleteMany({ where: { stickerId: id } });
      return res.json({ data: { stickerId: id, quantity: 0 } });
    }

    const dup = await prisma.duplicate.upsert({
      where: { stickerId: id },
      update: { quantity: newQty },
      create: { stickerId: id, quantity: newQty },
    });

    res.json({ data: dup });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/duplicates/:stickerId
router.delete('/:stickerId', async (req, res, next) => {
  try {
    await prisma.duplicate.deleteMany({ where: { stickerId: req.params.stickerId.toUpperCase() } });
    res.json({ data: { removed: req.params.stickerId.toUpperCase() } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
