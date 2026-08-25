// ============================================================
// TEAM HAT CARDHOUSE — Prisma Configuration
// PROMPT-01: Prisma 7 requires datasource URL and seed command
//            in this file, not in schema.prisma or package.json.
// ============================================================

import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    // Seed runner: tsx prisma/seed.ts (as per PROMPT-01 adjustment #2)
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Cloud database (PostgreSQL/Supabase)
    url: process.env.DATABASE_URL,
  },
});

