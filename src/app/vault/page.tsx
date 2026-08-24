import type { Metadata } from 'next';
import { Layers, Lock, ArrowLeftRight, Plus } from 'lucide-react';
import prisma from '@/../lib/prisma';
import VaultGrid from '@/components/VaultGrid';

export const metadata: Metadata = {
  title: 'Trade Vault',
  description:
    'Browse Team HAT\'s full trading card inventory. Filter by game, condition, and status. Send a proposal directly via WhatsApp.',
};

// Force dynamic so Prisma runs server-side on each request
export const dynamic = 'force-dynamic';

async function getCards() {
  const cards = await prisma.card.findMany({
    where: {
      status: { in: ['AVAILABLE', 'TRADE_ONLY'] },
    },
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
  });

  // Convert Prisma Decimal to plain number for serialization
  return cards.map((c) => ({
    ...c,
    priceSar: parseFloat(c.priceSar.toString()),
  }));
}

export default async function VaultPage() {
  const cards = await getCards();

  const totalAvailable  = cards.filter((c) => c.status === 'AVAILABLE').length;
  const totalTradeOnly  = cards.filter((c) => c.status === 'TRADE_ONLY').length;
  const totalVault      = cards.filter((c) => c.status === 'VAULT').length;

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--bg-base)',
          paddingTop: '88px',
          transition: 'background 0.25s ease',
        }}
      >
        {/* ─── Page Header ─────────────────────────────────────── */}
        <div
          style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '36px 24px 28px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '12px' }}>
              <ol
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  gap: '6px',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  alignItems: 'center',
                }}
              >
                <li><a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</a></li>
                <li style={{ color: 'var(--border-default)' }}>/</li>
                <li style={{ color: 'var(--hat-green-400)', fontWeight: 600 }}>Trade Vault</li>
              </ol>
            </nav>

            {/* Title row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '42px', height: '42px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #064e3b, #10b981)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Layers size={20} color="white" strokeWidth={2} />
                  </div>
                  <h1
                    id="vault-heading"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      margin: 0,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Trade Vault
                  </h1>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0, maxWidth: '520px' }}>
                  Browse our full inventory. Add cards to your Trade Binder and send a proposal directly via WhatsApp.
                </p>
              </div>

              {/* Status summary chips */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '6px 12px', borderRadius: '7px',
                    background: 'rgba(52,211,153,0.08)',
                    border: '1px solid rgba(52,211,153,0.25)',
                    color: '#34d399', fontSize: '0.78rem', fontWeight: 700,
                  }}
                >
                  <Plus size={11} />
                  {totalAvailable} For Sale
                </span>
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '6px 12px', borderRadius: '7px',
                    background: 'rgba(251,191,36,0.08)',
                    border: '1px solid rgba(251,191,36,0.25)',
                    color: '#fbbf24', fontSize: '0.78rem', fontWeight: 700,
                  }}
                >
                  <ArrowLeftRight size={11} />
                  {totalTradeOnly} Trade Only
                </span>
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '6px 12px', borderRadius: '7px',
                    background: 'rgba(129,140,248,0.08)',
                    border: '1px solid rgba(129,140,248,0.25)',
                    color: '#818cf8', fontSize: '0.78rem', fontWeight: 700,
                  }}
                >
                  <Lock size={11} />
                  {totalVault} Vault
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Main Content ─────────────────────────────────────── */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '36px 24px 80px',
          }}
        >
          <VaultGrid cards={cards} />
        </div>
      </div>
    </>
  );
}
