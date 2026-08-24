import type { Metadata } from 'next';
import prisma from '@/../lib/prisma';
import { Layers, Coins, Box, Archive } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Control Room | Overview',
};

export const dynamic = 'force-dynamic';

async function getDashboardStats() {
  const [
    totalCards,
    availableCards,
    vaultedCards,
    inventoryValueAgg
  ] = await Promise.all([
    prisma.card.count(),
    prisma.card.count({ where: { status: 'AVAILABLE' } }),
    prisma.card.count({ where: { status: 'VAULT' } }),
    prisma.card.aggregate({
      where: { status: { not: 'ARCHIVED' } },
      _sum: { priceSar: true }
    })
  ]);

  const totalValue = inventoryValueAgg._sum.priceSar 
    ? parseFloat(inventoryValueAgg._sum.priceSar.toString()) 
    : 0;

  return {
    totalCards,
    availableCards,
    vaultedCards,
    totalValue
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const kpiCards = [
    {
      title: 'Total Inventory Value',
      value: `${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR`,
      icon: Coins,
      color: '#fbbf24',
      bg: 'rgba(251,191,36,0.1)'
    },
    {
      title: 'Total Cards Listed',
      value: stats.totalCards.toString(),
      icon: Layers,
      color: '#34d399',
      bg: 'rgba(52,211,153,0.1)'
    },
    {
      title: 'Cards Available',
      value: stats.availableCards.toString(),
      icon: Box,
      color: '#60a5fa',
      bg: 'rgba(96,165,250,0.1)'
    },
    {
      title: 'Cards Vaulted',
      value: stats.vaultedCards.toString(),
      icon: Archive,
      color: '#a78bfa',
      bg: 'rgba(167,139,250,0.1)'
    }
  ];

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
          Overview
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
          High-level metrics and system status.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px'
      }}>
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{
                width: '40px', height: '40px',
                borderRadius: '10px',
                background: kpi.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Icon size={20} color={kpi.color} />
              </div>
              
              <div>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {kpi.title}
                </p>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: 0
                }}>
                  {kpi.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
