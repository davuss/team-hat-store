import type { Metadata } from 'next';
import prisma from '@/../lib/prisma';
import VaultGrid from '@/components/VaultGrid';

export const metadata: Metadata = {
  title: 'The Showcase | Team HAT',
  description: 'A museum of vaulted, high-value, and personal collection cards that are Not For Sale.',
};

export const dynamic = 'force-dynamic';

async function getVaultCards() {
  const cards = await prisma.card.findMany({
    where: {
      status: 'VAULT',
    },
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
  });

  // Convert Decimals to string for client component props
  return cards.map(card => ({
    ...card,
    priceSar: card.priceSar ? card.priceSar.toString() : null,
  }));
}

export default async function ShowcasePage() {
  const cards = await getVaultCards();

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ 
            fontFamily: "'Space Grotesk', sans-serif", 
            fontSize: '3rem', 
            fontWeight: 800, 
            marginBottom: '16px' 
          }}>
            The Showcase
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            maxWidth: '600px', 
            margin: '0 auto', 
            lineHeight: 1.6,
            fontSize: '1.1rem'
          }}>
            Welcome to the museum. These items are vaulted pieces of our personal collection, high-end graded cards, and historical items. <br />
            <strong>These items are Not For Sale (NFS).</strong>
          </p>
        </header>

        {cards.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <p>The showcase is currently empty.</p>
          </div>
        ) : (
          <VaultGrid cards={cards as any} />
        )}
      </div>
    </div>
  );
}
