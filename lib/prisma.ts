// ============================================================
// TEAM HAT CARDHOUSE — Prisma Client Singleton
// PROMPT-01: Prisma 7 requires a driver adapter for SQLite.
//            Uses @prisma/adapter-better-sqlite3.
//            Singleton pattern prevents multiple connections
//            during Next.js dev hot-reload cycles.
// ============================================================

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import path from 'path';

// Resolve absolute path to SQLite file from project root
const DB_URL = process.env.DATABASE_URL ?? 'file:./prisma/dev.db';
const dbPath = DB_URL.replace(/^file:/, '');
const absoluteDbPath = path.isAbsolute(dbPath)
  ? dbPath
  : path.join(process.cwd(), dbPath);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaBetterSqlite3({ url: `file:${absoluteDbPath}` });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
