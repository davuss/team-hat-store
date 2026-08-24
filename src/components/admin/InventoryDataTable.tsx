'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Edit2, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CardEditorSheet from './CardEditorSheet';

interface InventoryDataTableProps {
  cards: any[];
}

export default function InventoryDataTable({ cards }: InventoryDataTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredCards = cards.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setCardToEdit(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (card: any) => {
    setCardToEdit(card);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card? This action cannot be undone.')) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/cards/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete card.');
      }
    } catch (e) {
      alert('Error deleting card.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: '12px',
        border: '1px solid var(--border-default)',
        overflow: 'hidden'
      }}>
        {/* Toolbar */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by card title or game..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 42px',
                borderRadius: '8px',
                background: 'var(--bg-base)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--hat-green-500)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
            />
          </div>

          <button onClick={handleAddNew} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 16px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #064e3b, #10b981)',
            color: 'white', border: 'none', fontWeight: 600, fontSize: '0.9rem',
            cursor: 'pointer', transition: 'opacity 0.2s'
          }}>
            <Plus size={18} /> Add New Card
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
              <tr>
                <th style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Image</th>
                <th style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Title</th>
                <th style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Game</th>
                <th style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Price (SAR)</th>
                <th style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCards.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <AlertCircle size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>No cards found</p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Try adjusting your search criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredCards.map((card) => (
                  <tr key={card.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px 20px' }}>
                      <div style={{
                        width: '40px', height: '56px', borderRadius: '4px',
                        background: 'var(--bg-base)', border: '1px solid var(--border-default)',
                        overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {card.imageUrl ? (
                          <Image src={card.imageUrl} alt={card.title} fill style={{ objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '1.2rem' }}>🃏</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>{card.title}</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{card.setName} • {card.cardNumber}</span>
                    </td>
                    <td style={{ padding: '12px 20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {card.game}
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{
                        display: 'inline-flex', padding: '4px 10px', borderRadius: '9999px',
                        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em',
                        background: card.status === 'AVAILABLE' ? 'rgba(52,211,153,0.1)' : card.status === 'TRADE_ONLY' ? 'rgba(251,191,36,0.1)' : card.status === 'VAULT' ? 'rgba(167,139,250,0.1)' : 'rgba(156,163,175,0.1)',
                        color: card.status === 'AVAILABLE' ? '#10b981' : card.status === 'TRADE_ONLY' ? '#fbbf24' : card.status === 'VAULT' ? '#a78bfa' : '#9ca3af',
                        border: `1px solid ${card.status === 'AVAILABLE' ? 'rgba(52,211,153,0.3)' : card.status === 'TRADE_ONLY' ? 'rgba(251,191,36,0.3)' : card.status === 'VAULT' ? 'rgba(167,139,250,0.3)' : 'rgba(156,163,175,0.3)'}`
                      }}>
                        {card.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {card.priceSar}
                    </td>
                    <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button onClick={() => handleEdit(card)} style={{
                          width: '32px', height: '32px', borderRadius: '6px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'var(--bg-base)', border: '1px solid var(--border-default)',
                          color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s'
                        }} title="Edit">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(card.id)} disabled={deletingId === card.id} style={{
                          width: '32px', height: '32px', borderRadius: '6px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'var(--bg-base)', border: '1px solid var(--border-default)',
                          color: '#ef4444', cursor: deletingId === card.id ? 'not-allowed' : 'pointer', transition: 'all 0.2s'
                        }} title="Delete">
                          {deletingId === card.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CardEditorSheet 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
        cardToEdit={cardToEdit} 
      />
    </>
  );
}
