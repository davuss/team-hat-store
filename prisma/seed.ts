// ============================================================
// TEAM HAT CARDHOUSE — Prisma Seed Script
// PROMPT-01: 6 realistic sample items across all game categories
// Runner: tsx prisma/seed.ts (configured in prisma.config.ts)
// Prisma 7: uses @prisma/adapter-better-sqlite3 driver adapter
// ============================================================

import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding Team HAT Cardhouse database...\n');

  // ─── Clear existing data ───────────────────────────────────
  await prisma.systemConfig.deleteMany();
  await prisma.card.deleteMany();

  // ─── System Config (scalable hooks, all inactive by default) ─
  const configs = [
    { key: 'vat_enabled',       value: 'false' },
    { key: 'vat_rate',          value: '0.15'  },
    { key: 'toploader_upgrade', value: 'true'  },
    { key: 'toploader_fee_sar', value: '2.00'  },
    { key: 'referral_enabled',  value: 'false' },
    { key: 'referral_discount', value: '0.10'  },
    { key: 'config_whatsapp',   value: '+966000000000' },
    { key: 'config_games',      value: JSON.stringify(['Pokémon', 'One Piece', 'Disney Lorcana', 'Topps', 'Riftbound', 'Merch']) },
    { key: 'config_conditions', value: JSON.stringify(['Mint', 'Near Mint (NM)', 'Lightly Played (LP)', 'Moderately Played (MP)', 'Graded']) },
    { key: 'config_finishes',   value: JSON.stringify(['Normal', 'Holo', 'Reverse Holo', 'Textured', 'Full Art']) },
  ];

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where:  { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }

  console.log('✅ System configs seeded');

  // ─── Cards ────────────────────────────────────────────────
  const cards = [
    // 1. Pokémon — Charizard ex (SAV 054) — AVAILABLE
    {
      slug:       'charizard-ex-sv4-054-english-nm',
      title:      'Charizard ex',
      game:       'Pokémon',
      setName:    'Paradox Rift (SV4)',
      cardNumber: '054/182',
      rarity:     'Double Rare',
      finish:     'Holo',
      condition:  'Near Mint (NM)',
      language:   'English',
      priceSar:   180.00,
      stockQty:   1,
      status:     'AVAILABLE',
      imageUrl:   'https://images.pokemontcg.io/sv4/54_hires.png',
      isFeatured: true,
    },
    // 2. One Piece — Monkey D. Luffy Manga Rare — VAULT
    {
      slug:       'luffy-manga-rare-op09-english-nm',
      title:      'Monkey D. Luffy (Manga Rare)',
      game:       'One Piece',
      setName:    'Emperors in the New World (OP-09)',
      cardNumber: 'OP09-001',
      rarity:     'Manga Rare',
      finish:     'Full Art',
      condition:  'Near Mint (NM)',
      language:   'English',
      priceSar:   350.00,
      stockQty:   1,
      status:     'VAULT',
      imageUrl:   'https://en.onepiece-cardgame.com/images/cardlist/card/OP09-001.png',
      isFeatured: true,
    },
    // 3. Disney Lorcana — Elsa Enchanted — TRADE_ONLY
    {
      slug:       'elsa-spirit-of-winter-enchanted-en-nm',
      title:      'Elsa — Spirit of Winter (Enchanted)',
      game:       'Disney Lorcana',
      setName:    "The First Chapter",
      cardNumber: '207/204',
      rarity:     'Enchanted',
      finish:     'Textured',
      condition:  'Near Mint (NM)',
      language:   'English',
      priceSar:   420.00,
      stockQty:   1,
      status:     'TRADE_ONLY',
      imageUrl:   'https://sixfortyfive.com/wp-content/uploads/2023/08/Elsa-Enchanted.jpg',
      isFeatured: false,
    },
    // 4. Topps Premier League — Erling Haaland Gold Shimmer — AVAILABLE
    {
      slug:       'haaland-gold-shimmer-topps-24-25-nm',
      title:      'Erling Haaland — Gold Shimmer',
      game:       'Topps',
      setName:    'Topps Premier League 2024/25',
      cardNumber: 'GS-EH',
      rarity:     'Gold Shimmer',
      finish:     'Normal',
      condition:  'Near Mint (NM)',
      language:   'English',
      priceSar:   95.00,
      stockQty:   2,
      status:     'AVAILABLE',
      imageUrl:   'https://placehold.co/400x560/1a1a2e/fbbf24?text=Haaland+Gold+Shimmer',
      isFeatured: false,
    },
    // 5. LoL Riftbound — Noxus Starter Deck — AVAILABLE
    {
      slug:       'riftbound-noxus-starter-deck-en',
      title:      'Riftbound Starter Deck — Noxus',
      game:       'Riftbound',
      setName:    'Riftbound Launch Set',
      cardNumber: 'NOXUS-STARTER',
      rarity:     'Starter Deck',
      finish:     'Normal',
      condition:  'Near Mint (NM)',
      language:   'English',
      priceSar:   65.00,
      stockQty:   3,
      status:     'AVAILABLE',
      imageUrl:   'https://placehold.co/400x560/1a1a2e/ef4444?text=Riftbound+Noxus',
      isFeatured: false,
    },
    // 6. Team HAT Merch — Snapback Cap — AVAILABLE
    {
      slug:       'team-hat-snapback-cap-green',
      title:      'Team HAT Snapback Cap — Emerald Green',
      game:       'Merch',
      setName:    'Team HAT Official Merchandise',
      cardNumber: 'MERCH-CAP-001',
      rarity:     'Limited Edition',
      finish:     'Normal',
      condition:  'Mint',
      language:   'English',
      priceSar:   120.00,
      stockQty:   5,
      status:     'AVAILABLE',
      imageUrl:   'https://placehold.co/400x400/064e3b/fbbf24?text=Team+HAT+Cap',
      isFeatured: true,
    },
  ];

  for (const card of cards) {
    const created = await prisma.card.create({ data: card as any });
    console.log(`  🃏 ${created.title} [${created.status}] — ${created.game}`);
  }

  console.log('\n✅ All 6 cards seeded');
  console.log('✅ Database seeding complete!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
