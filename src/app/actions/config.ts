'use server';

import prisma from '@/../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getDynamicConfigs() {
  const configs = await prisma.systemConfig.findMany({
    where: {
      key: {
        in: ['config_games', 'config_conditions', 'config_finishes'],
      },
    },
  });

  const parsed = {
    games: [] as string[],
    conditions: [] as string[],
    finishes: [] as string[],
  };

  configs.forEach((c: any) => {
    try {
      if (c.key === 'config_games') parsed.games = JSON.parse(c.value);
      if (c.key === 'config_conditions') parsed.conditions = JSON.parse(c.value);
      if (c.key === 'config_finishes') parsed.finishes = JSON.parse(c.value);
    } catch (e) {
      console.error(`Error parsing JSON for ${c.key}:`, e);
    }
  });

  return parsed;
}

export async function updateDynamicConfig(key: 'config_games' | 'config_conditions' | 'config_finishes', values: string[]) {
  await prisma.systemConfig.upsert({
    where: { key },
    update: { value: JSON.stringify(values) },
    create: { key, value: JSON.stringify(values) },
  });

  // Revalidate everything since configs affect global UI
  revalidatePath('/', 'layout');
}
