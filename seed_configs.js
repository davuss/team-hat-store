const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const games = ["Pokémon", "One Piece", "Disney Lorcana", "Magic: The Gathering", "Yu-Gi-Oh!", "Star Wars: Unlimited", "Flesh & Blood", "Topps", "Riftbound", "Merch"];
  
  const conditions = ["Gem Mint", "Mint", "Near Mint (NM)", "Lightly Played (LP)", "Moderately Played (MP)", "Heavily Played (HP)", "Damaged", "Graded"];

  const rarities = ["Common", "Uncommon", "Rare", "Super Rare (SR)", "Ultra Rare (UR)", "Double Rare (RR)", "Triple Rare (RRR)", "Secret Rare (SEC/SR)", "Hyper Rare (HR)", "Illustration Rare (IR)", "Special Illustration Rare (SIR)", "Alternate Art (Alt Art)", "Promo", "Legendary", "Epic", "Enchanted", "Iconic", "Leader (L)", "Special Rare (SP)", "Treasure Rare (TR)", "Manga Rare", "Gold Manga Rare", "Red Manga Rare", "ACE SPEC Rare", "Futuristic Rare", "Mega Attack Rare (MAR)", "Ghost Rare", "Ultimate Rare", "Starlight Rare", "Collector's Rare", "Quarter Century Secret Rare"];
  
  const finishes = ["Normal (Non-Holo)", "Holofoil", "Reverse Holo", "Textured / Etched", "Full Art (FA)", "Half Art / Regular Art", "Borderless", "Extended Art", "Showcase", "Cracked Ice Holo", "Cosmos Holo", "Galaxy Holo", "Shattered Glass", "Cold Foil", "Rainbow Foil", "Star Foil", "Hot Stamped", "Refractor", "Chrome", "Gold Foil", "Silver Foil", "Gold Vinyl"];

  await prisma.systemConfig.upsert({
    where: { key: 'config_games' },
    update: { value: JSON.stringify(games) },
    create: { key: 'config_games', value: JSON.stringify(games) },
  });

  await prisma.systemConfig.upsert({
    where: { key: 'config_conditions' },
    update: { value: JSON.stringify(conditions) },
    create: { key: 'config_conditions', value: JSON.stringify(conditions) },
  });

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

  console.log("Successfully updated exhaustive TCG configurations.");
  await prisma.$disconnect();
}

main().catch(console.error);
