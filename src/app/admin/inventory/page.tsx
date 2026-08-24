import type { Metadata } from 'next';
import prisma from '@/../lib/prisma';
import InventoryDataTable from '@/components/admin/InventoryDataTable';

export const metadata: Metadata = {
  title: 'Control Room | Inventory',
};

export const dynamic = 'force-dynamic';

async function getAllCards() {
  const cards = await prisma.card.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Convert Prisma Decimal to plain string/number for client component serialization
  return cards.map(c => ({
    ...c,
    priceSar: parseFloat(c.priceSar.toString()),
  }));
}

export default async function AdminInventoryPage() {
  const cards = await getAllCards();

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          margin: '0 0 8px 0',
          letterSpacing: '-0.03em'
        }}>
          Inventory Manager
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
          Manage all trading cards, including vaulted and archived items.
        </p>
      </div>

      <InventoryDataTable cards={cards} />
    </div>
  );
}
