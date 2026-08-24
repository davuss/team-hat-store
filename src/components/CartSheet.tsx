'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, Trash2, MessageCircle, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import { useCartStore, buildWhatsAppUrl } from '@/store/cartStore';

export default function CartSheet() {
  const { items, isOpen, closeCart, removeItem, clearCart, totalSar, itemCount } = useCartStore();
  const total = totalSar();
  const count = itemCount();

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen && items.length === 0) return null;

  return (
    <>
      {/* ─── Backdrop ──────────────────────────────────────────── */}
      <div
        id="cart-backdrop"
        aria-hidden="true"
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 98,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* ─── Sheet Panel ───────────────────────────────────────── */}
      <aside
        id="cart-sheet"
        role="dialog"
        aria-label="Trade Binder — Proposal Cart"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          width: '100%',
          maxWidth: '420px',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-default)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px', height: '36px',
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #064e3b, #10b981)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ShoppingBag size={17} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                Trade Binder
              </h2>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
                {count} card{count !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {count > 0 && (
              <button
                id="cart-clear-btn"
                aria-label="Clear all cards from binder"
                onClick={clearCart}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#ef4444';
                  (e.currentTarget as HTMLElement).style.color = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                }}
              >
                <Trash2 size={12} />
                Clear
              </button>
            )}
            <button
              id="cart-close-btn"
              aria-label="Close trade binder"
              onClick={closeCart}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-elevated)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 24px',
          }}
        >
          {items.length === 0 ? (
            /* Empty state */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: '16px',
                color: 'var(--text-muted)',
                textAlign: 'center',
                padding: '40px 0',
              }}
            >
              <Package size={48} strokeWidth={1.5} style={{ opacity: 0.3 }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: '0 0 6px', color: 'var(--text-secondary)' }}>
                  Your binder is empty
                </p>
                <p style={{ fontSize: '0.82rem', margin: 0 }}>
                  Add cards from the vault to build your proposal.
                </p>
              </div>
              <button
                onClick={closeCart}
                style={{
                  padding: '9px 20px',
                  borderRadius: '7px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                Browse Vault
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="fade-in"
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  {/* Card image thumbnail */}
                  <div
                    style={{
                      width: '52px',
                      height: '72px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      background: 'var(--card-image-bg)',
                      flexShrink: 0,
                      position: 'relative',
                    }}
                  >
                    {item.imageUrl && item.imageUrl.startsWith('http') ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="52px"
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%', height: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.2rem',
                        }}
                      >
                        🃏
                      </div>
                    )}
                  </div>

                  {/* Card info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: 'var(--text-primary)',
                        margin: '0 0 3px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.title}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0 0 6px' }}>
                      {item.condition} · {item.game}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--hat-green-400)',
                        margin: 0,
                      }}
                    >
                      {item.priceSar.toFixed(2)} SAR
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    id={`cart-remove-${item.id}`}
                    aria-label={`Remove ${item.title} from binder`}
                    onClick={() => removeItem(item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '28px', height: '28px',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      alignSelf: 'flex-start',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)';
                      (e.currentTarget as HTMLElement).style.color = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    }}
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — Total + WhatsApp button */}
        {items.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid var(--border-subtle)',
              flexShrink: 0,
              background: 'var(--bg-elevated)',
            }}
          >
            {/* Total */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
                Proposal Total
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                }}
              >
                {total.toFixed(2)}{' '}
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>SAR</span>
              </span>
            </div>

            {/* WhatsApp CTA */}
            <a
              id="whatsapp-proposal-btn"
              href={buildWhatsAppUrl(items)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: '0.01em',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 20px rgba(34,197,94,0.3)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(34,197,94,0.45)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(34,197,94,0.3)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <MessageCircle size={19} strokeWidth={2.5} />
              Send Proposal via WhatsApp
            </a>

            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '10px', marginBottom: 0 }}>
              Opens WhatsApp with your card list pre-filled
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
