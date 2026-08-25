'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Plus, Check, Eye, ArrowLeftRight, Lock, X } from 'lucide-react';
import { useCartStore, type CartCard } from '@/store/cartStore';

// ─── Status badge config ──────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
  AVAILABLE:  { label: 'For Sale',    color: '#34d399', bg: 'rgba(52,211,153,0.10)',  border: 'rgba(52,211,153,0.3)',  icon: Plus         },
  TRADE_ONLY: { label: 'Trade Only',  color: '#fbbf24', bg: 'rgba(251,191,36,0.10)',  border: 'rgba(251,191,36,0.3)',  icon: ArrowLeftRight},
  VAULT:      { label: 'Vault',       color: '#818cf8', bg: 'rgba(129,140,248,0.10)', border: 'rgba(129,140,248,0.3)', icon: Lock          },
};

const GAME_EMOJI: Record<string, string> = {
  Pokemon:   '⚡',
  OnePiece:  '☠️',
  Lorcana:   '✨',
  Topps:     '⚽',
  Riftbound: '⚔️',
  Merch:     '🧢',
};

interface VaultCardProps {
  card: {
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
    priceSar:   number | string; // Prisma Decimal serializes as string
    stockQty:   number;
    status:     string;
    imageUrl:   string;
    isFeatured: boolean;
  };
}

export default function VaultCard({ card }: VaultCardProps) {
  const { addItem, removeItem, hasItem, openCart } = useCartStore();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const price = typeof card.priceSar === 'string' ? parseFloat(card.priceSar) : card.priceSar;
  const inCart = hasItem(card.id);
  const statusCfg = STATUS_CONFIG[card.status] ?? STATUS_CONFIG.AVAILABLE;
  const canAdd = card.status === 'AVAILABLE' || card.status === 'TRADE_ONLY';

  const cartCard: CartCard = {
    id:        card.id,
    slug:      card.slug,
    title:     card.title,
    game:      card.game,
    setName:   card.setName,
    condition: card.condition,
    finish:    card.finish,
    priceSar:  price,
    imageUrl:  card.imageUrl,
    status:    card.status,
  };

  const handleCartAction = () => {
    if (inCart) {
      removeItem(card.id);
    } else {
      addItem(cartCard);
      openCart();
    }
  };

  return (
    <article
      id={`vault-card-${card.slug}`}
      className="card-hover"
      aria-label={`${card.title} — ${card.condition} — ${price.toFixed(2)} SAR`}
      style={{
        borderRadius: '14px',
        background: 'var(--bg-card)',
        border: `1px solid ${inCart ? 'var(--hat-green-700)' : 'var(--card-border)'}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        position: 'relative',
      }}
    >
      {/* Featured badge */}
      {card.isFeatured && (
        <div
          aria-label="Featured card"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 2,
            padding: '2px 8px',
            borderRadius: '5px',
            background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
            color: '#000',
            fontSize: '0.62rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          ⭐ Featured
        </div>
      )}

      {/* Card Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          background: 'var(--card-image-bg)',
          overflow: 'hidden',
          cursor: card.imageUrl ? 'zoom-in' : 'default',
        }}
        onClick={() => {
          if (card.imageUrl) setIsLightboxOpen(true);
        }}
      >
        {card.imageUrl && (card.imageUrl.startsWith('http') || card.imageUrl.startsWith('/')) ? (
          <Image
            src={card.imageUrl}
            alt={card.title}
            fill
            style={{ objectFit: 'contain', padding: '8px' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
            onError={() => {/* handled by fallback */}}
          />
        ) : (
          <div
            style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '8px',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ fontSize: '3rem' }}>{GAME_EMOJI[card.game] ?? '🃏'}</span>
            <span style={{ fontSize: '0.75rem' }}>{card.game}</span>
          </div>
        )}

        {/* VAULT overlay */}
        {card.status === 'VAULT' && (
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '6px',
              }}
            >
              <Lock size={28} color="rgba(129,140,248,0.9)" strokeWidth={2} />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Vault
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Status + Game */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
          <span
            className="status-badge"
            style={{
              color: statusCfg.color,
              background: statusCfg.bg,
              borderColor: statusCfg.border,
            }}
          >
            {card.status === 'AVAILABLE' && <Plus size={9} />}
            {card.status === 'TRADE_ONLY' && <ArrowLeftRight size={9} />}
            {card.status === 'VAULT' && <Eye size={9} />}
            {statusCfg.label}
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              fontWeight: 500,
              background: 'var(--bg-elevated)',
              padding: '2px 7px',
              borderRadius: '5px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {GAME_EMOJI[card.game]} {card.game === 'OnePiece' ? 'One Piece' : card.game}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1.3,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {card.title}
        </h3>

        {/* Set + condition meta */}
        <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
          {card.setName && <span>{card.setName}</span>}
          {card.cardNumber && <span style={{ marginLeft: 4 }}>#{card.cardNumber}</span>}
        </p>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.68rem', fontWeight: 600,
              color: 'var(--text-secondary)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px', padding: '2px 6px',
            }}
          >
            {card.condition}
          </span>
          {card.finish && card.finish !== 'Normal' && (
            <span
              style={{
                fontSize: '0.68rem', fontWeight: 600,
                color: 'var(--hat-gold-400)',
                background: 'rgba(251,191,36,0.1)',
                border: '1px solid rgba(251,191,36,0.25)',
                borderRadius: '4px', padding: '2px 6px',
              }}
            >
              {card.finish}
            </span>
          )}
          {card.language !== 'English' && (
            <span
              style={{
                fontSize: '0.68rem', fontWeight: 600,
                color: 'var(--text-muted)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px', padding: '2px 6px',
              }}
            >
              {card.language}
            </span>
          )}
        </div>

        {/* Price + Add button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: '10px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {/* Price */}
          <div>
            {card.status !== 'VAULT' ? (
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                }}
              >
                {price.toFixed(2)}{' '}
                <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--text-muted)' }}>SAR</span>
              </span>
            ) : (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Not for sale
              </span>
            )}
          </div>

          {/* Action button */}
          {canAdd ? (
            <button
              id={`add-to-binder-${card.slug}`}
              aria-label={inCart ? `Remove ${card.title} from binder` : `Add ${card.title} to binder`}
              onClick={handleCartAction}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '8px 14px',
                borderRadius: '7px',
                border: inCart
                  ? '1px solid var(--hat-green-700)'
                  : '1px solid var(--border-default)',
                background: inCart
                  ? 'rgba(6,78,59,0.3)'
                  : 'var(--bg-elevated)',
                color: inCart ? 'var(--hat-green-400)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!inCart) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--hat-green-700)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--hat-green-400)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(6,78,59,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!inCart) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
                }
              }}
            >
              {inCart ? (
                <>
                  <Check size={13} strokeWidth={2.5} />
                  Added
                </>
              ) : (
                <>
                  <Plus size={13} strokeWidth={2.5} />
                  Add
                </>
              )}
            </button>
          ) : (
            <div
              style={{
                padding: '7px 12px',
                borderRadius: '7px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-elevated)',
                display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '0.75rem', color: 'var(--text-muted)',
              }}
            >
              <Eye size={12} />
              Showcase
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {mounted && isLightboxOpen && card.imageUrl && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(false);
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '90%',
              maxWidth: '500px',
              aspectRatio: '3/4',
            }}
          >
            <Image
              src={card.imageUrl}
              alt={card.title}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 90vw, 500px"
              priority
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(false);
            }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <X size={24} />
          </button>
        </div>,
        document.body
      )}
    </article>
  );
}
