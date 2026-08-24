'use client';

import { useState } from 'react';
import VaultCard from '@/components/VaultCard';
import { GAMES, GAME_LABELS, type Game } from '@/types/card';

const GAME_EMOJI: Record<string, string> = {
  'Pokémon':        '⚡',
  'One Piece':      '☠️',
  'Disney Lorcana': '✨',
  'Topps':          '⚽',
  'Riftbound':      '⚔️',
  'Merch':          '🧢',
};

interface VaultGridProps {
  cards: {
    id:         string;
    slug:       string;
    title:      string;
    game:       string;
    setName:    string;
    cardNumber: string;
    rarity:     string;
    finish:     string;
    condition:  string;
    language:   string;
    priceSar:   number | string;
    stockQty:   number;
    status:     string;
    imageUrl:   string;
    isFeatured: boolean;
  }[];
}

export default function VaultGrid({ cards }: VaultGridProps) {
  const [activeGame, setActiveGame] = useState<string>('ALL');

  const filtered = activeGame === 'ALL'
    ? cards
    : cards.filter((c) => c.game === activeGame);

  // Build game counts from actual inventory
  const gameCounts = cards.reduce<Record<string, number>>((acc, c) => {
    acc[c.game] = (acc[c.game] ?? 0) + 1;
    return acc;
  }, {});

  const dynamicGames = Object.keys(gameCounts).sort();

  const FILTER_OPTIONS = [
    { key: 'ALL', label: 'All Cards', emoji: '🃏', count: cards.length },
    ...dynamicGames.map((g) => ({
      key: g,
      label: g,
      emoji: GAME_EMOJI[g] || '🃏',
      count: gameCounts[g],
    })),
  ];

  return (
    <>
      {/* ─── Filter Bar ─────────────────────────────────────── */}
      <div
        id="vault-filter-bar"
        role="tablist"
        aria-label="Filter cards by game"
        className="flex flex-wrap gap-2 mb-8"
      >
        {FILTER_OPTIONS.map(({ key, label, emoji, count }) => {
          const isActive = activeGame === key;
          return (
            <button
              key={key}
              id={`filter-${key.toLowerCase().replace(/\s+/g, '-')}`}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveGame(key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '9999px',
                background: isActive ? 'rgba(16,185,129,0.1)' : 'transparent',
                border: isActive
                  ? '1px solid rgba(16,185,129,0.5)'
                  : '1px solid var(--border-default)',
                color: isActive ? 'var(--hat-green-400)' : 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-muted)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }
              }}
            >
              <span>{emoji}</span>
              {label}
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  background: isActive
                    ? 'rgba(16,185,129,0.25)'
                    : 'var(--bg-base)',
                  color: isActive ? 'var(--hat-green-300)' : 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── Results count ─────────────────────────────────── */}
      <p
        style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          marginBottom: '20px',
        }}
        aria-live="polite"
      >
        Showing <strong style={{ color: 'var(--text-secondary)' }}>{filtered.length}</strong> card
        {filtered.length !== 1 ? 's' : ''}
        {activeGame !== 'ALL' && (
          <> in <strong style={{ color: 'var(--hat-green-400)' }}>{GAME_LABELS[activeGame as Game]}</strong></>
        )}
      </p>

      {/* ─── Card Grid ─────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🃏</span>
          <p style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            No cards in this category yet
          </p>
          <button
            onClick={() => setActiveGame('ALL')}
            style={{
              padding: '8px 20px',
              borderRadius: '7px',
              border: '1px solid var(--border-default)',
              background: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginTop: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            Show all cards
          </button>
        </div>
      ) : (
        <div
          id="vault-card-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map((card) => (
            <VaultCard key={card.id} card={card} />
          ))}
        </div>
      )}
    </>
  );
}
