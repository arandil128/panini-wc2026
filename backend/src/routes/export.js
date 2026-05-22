const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');

const router = Router();
const prisma = new PrismaClient();

function toCSV(rows, headers) {
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(','));
  }
  return lines.join('\n');
}

// GET /api/export/missing?format=txt|csv|json
router.get('/missing', async (req, res, next) => {
  try {
    const format = req.query.format || 'txt';
    const stickers = await prisma.sticker.findMany({
      where: { collectionEntry: null },
      orderBy: [{ section: { order: 'asc' } }, { number: 'asc' }],
      include: { section: { select: { name: true } } },
    });

    const rows = stickers.map(s => ({
      codigo: s.id,
      seccion: s.section.name,
      numero: s.number,
      jugador: s.playerName || s.description || '',
    }));

    if (format === 'json') {
      res.setHeader('Content-Disposition', 'attachment; filename="faltantes.json"');
      return res.json(rows);
    }

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="faltantes.csv"');
      return res.send('﻿' + toCSV(rows, ['codigo', 'seccion', 'numero', 'jugador']));
    }

    // txt
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="faltantes.txt"');
    const txt = rows.map(r => `${r.codigo.padEnd(6)} ${r.seccion} - ${r.jugador || r.numero}`).join('\n');
    res.send(txt);
  } catch (err) {
    next(err);
  }
});

// GET /api/export/duplicates?format=txt|csv|json
router.get('/duplicates', async (req, res, next) => {
  try {
    const format = req.query.format || 'txt';
    const dups = await prisma.duplicate.findMany({
      orderBy: [{ sticker: { section: { order: 'asc' } } }, { sticker: { number: 'asc' } }],
      include: { sticker: { include: { section: { select: { name: true } } } } },
    });

    const rows = dups.map(d => ({
      codigo: d.stickerId,
      seccion: d.sticker.section.name,
      numero: d.sticker.number,
      jugador: d.sticker.playerName || d.sticker.description || '',
      cantidad: d.quantity,
    }));

    if (format === 'json') {
      res.setHeader('Content-Disposition', 'attachment; filename="repetidas.json"');
      return res.json(rows);
    }

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="repetidas.csv"');
      return res.send('﻿' + toCSV(rows, ['codigo', 'seccion', 'numero', 'jugador', 'cantidad']));
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="repetidas.txt"');
    const txt = rows.map(r => `${r.codigo.padEnd(6)} x${r.cantidad}  ${r.seccion} - ${r.jugador || r.numero}`).join('\n');
    res.send(txt);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
