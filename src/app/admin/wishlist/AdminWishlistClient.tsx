'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import Image from 'next/image';
import WishlistEditorSheet from '@/components/admin/WishlistEditorSheet';
import { deleteWishlistItem } from '@/app/actions/wishlist';

export default function AdminWishlistClient({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingItem(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this bounty?')) {
      await deleteWishlistItem(id);
      // Optimistic update
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search bounties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: '10px',
              border: '1px solid var(--border-default)',
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
            }}
          />
        </div>
        <button
          onClick={handleCreate}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '0 24px', borderRadius: '10px',
            background: 'var(--hat-green-500)', color: 'white',
            fontWeight: 600, border: 'none', cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          className="hover:bg-[var(--hat-green-600)]"
        >
          <Plus size={18} /> New Bounty
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Image</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Title</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Game</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Priority</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Reward Text</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    {item.imageUrl ? (
                      <div style={{ position: 'relative', width: '40px', height: '56px', borderRadius: '4px', overflow: 'hidden' }}>
                        <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ width: '40px', height: '56px', background: 'var(--bg-elevated)', borderRadius: '4px' }} />
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{item.game}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600,
                      background: 'var(--bg-elevated)', color: 'var(--text-primary)' 
                    }}>
                      {item.priority}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{item.rewardText}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleEdit(item)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }} className="hover:text-[var(--text-primary)]">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }} className="hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No bounties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <WishlistEditorSheet 
        isOpen={isEditorOpen} 
        onClose={() => {
          setIsEditorOpen(false);
          // In a real app we'd refetch or the server action's revalidatePath would trigger a fresh initialItems prop
          // For simplicity we rely on page refresh or just not updating the local state immediately upon edit
        }} 
        itemToEdit={editingItem} 
      />
    </>
  );
}
