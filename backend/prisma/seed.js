const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.sticker.count();
  if (existing > 0) {
    console.log(`DB ya tiene ${existing} figuritas. Seed omitido.`);
    return;
  }

  const dataPath = path.join(__dirname, '../src/data/stickers.json');
  const { sections } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log(`Insertando ${sections.length} secciones...`);

  for (const section of sections) {
    await prisma.section.create({
      data: {
        id: section.id,
        name: section.name,
        order: section.order,
        stickers: {
          create: section.stickers.map(s => ({
            id: s.id,
            number: s.number,
            playerName: s.playerName ?? null,
            description: s.description ?? null,
            isSpecial: s.isSpecial ?? false,
            isBadge: s.isBadge ?? false,
            isTeamPhoto: s.isTeamPhoto ?? false,
          })),
        },
      },
    });
  }

  const total = await prisma.sticker.count();
  console.log(`✅ Seed completo: ${total} figuritas insertadas.`);
}

// Exportable como módulo para server.js, ejecutable directo también
if (require.main === module) {
  main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
} else {
  module.exports = main;
}