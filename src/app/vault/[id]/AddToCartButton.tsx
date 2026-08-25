'use client';

import { useCartStore, type CartCard } from '@/store/cartStore';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

export default function AddToCartButton({ card }: { card: CartCard }) {
  const { addItem, removeItem, hasItem, openCart } = useCartStore();
  const [clicked, setClicked] = useState(false);
  const inCart = hasItem(card.id);
  
  const canAdd = card.status === 'AVAILABLE' || card.status === 'TRADE_ONLY';

  if (!canAdd) {
    return (
      <button 
        disabled
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '12px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        Unavailable
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        if (inCart) {
          removeItem(card.id);
        } else {
          addItem(card);
          openCart();
          setClicked(true);
          setTimeout(() => setClicked(false), 2000);
        }
      }}
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: '12px',
        background: inCart ? 'var(--bg-elevated)' : 'var(--hat-green-500)',
        border: `1px solid ${inCart ? 'var(--hat-green-500)' : 'transparent'}`,
        color: inCart ? 'var(--hat-green-400)' : '#fff',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s ease',
        boxShadow: inCart ? 'none' : '0 4px 14px rgba(16, 185, 129, 0.3)',
      }}
      onMouseEnter={(e) => {
        if (!inCart) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!inCart) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.3)';
        }
      }}
    >
      {inCart ? <Check size={20} /> : <ShoppingCart size={20} />}
      {inCart ? 'Remove from List' : 'Add to Trade / Buy List'}
    </button>
  );
}
