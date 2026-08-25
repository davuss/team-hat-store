const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const rarities = [
    "Common", "Uncommon", "Rare", "Super Rare (SR)", "Ultra Rare (UR)", 
    "Secret Rare (SEC/SR)", "Illustration Rare (IR)", "Special Illustration Rare (SIR)", 
    "Legendary", "Enchanted", "Promo", "Manga Rare"
  ];
  const finishes = [
    "Normal (Non-Holo)", "Holofoil", "Reverse Holo", "Textured / Etched", 
    "Cracked Ice", "Cold Foil", "Refractor", "Gold Foil"
  ];

  await prisma.systemConfig.upsert({
    where: { key: 'config_rarities' },
    update: { value: JSON.stringify(rarities) },
    create: { key: 'config_rarities', value: JSON.stringify(rarities) },
  });

  await prisma.systemConfig.upsert({
    where: { key: 'config_finishes' },
    update: { value: JSON.stringify(finishes) },
    create: { key: 'config_finishes', value: JSON.stringify(finishes) },
  });

  console.log("Successfully updated config_rarities and config_finishes.");
  await prisma.$disconnect();
}

main().catch(console.error);
