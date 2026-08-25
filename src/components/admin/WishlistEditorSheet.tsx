'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Save, Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import { createWishlistItem, updateWishlistItem } from '@/app/actions/wishlist';
import { getDynamicConfigs } from '@/app/actions/config';

interface WishlistEditorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit?: any | null;
}

export default function WishlistEditorSheet({ isOpen, onClose, itemToEdit }: WishlistEditorSheetProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dynamicGames, setDynamicGames] = useState<string[]>(['Pokémon']);

  const [formData, setFormData] = useState({
    title: '',
    game: 'Pokémon',
    priority: 'High Priority',
    rewardText: 'Will pay cash / High-end trade',
    imageUrl: '',
  });

  useEffect(() => {
    getDynamicConfigs().then(data => {
      if (data.games.length) setDynamicGames(data.games);
    });
  }, []);

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        title: itemToEdit.title || '',
        game: itemToEdit.game || 'Pokémon',
        priority: itemToEdit.priority || 'High Priority',
        rewardText: itemToEdit.rewardText || 'Will pay cash / High-end trade',
        imageUrl: itemToEdit.imageUrl || '',
      });
    } else {
      setFormData({
        title: '',
        game: 'Pokémon',
        priority: 'High Priority',
        rewardText: 'Will pay cash / High-end trade',
        imageUrl: '',
      });
    }
  }, [itemToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setFormData((prev) => ({ ...prev, imageUrl: json.url }));
      } else {
        alert('Upload failed: ' + json.error);
      }
    } catch (err) {
      alert('Upload error.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (itemToEdit) {
        await updateWishlistItem(itemToEdit.id, formData);
      } else {
        await createWishlistItem(formData);
      }
      router.refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error saving wishlist item.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'
      }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '100%', maxWidth: '500px',
        background: 'var(--bg-surface)', zIndex: 101,
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid var(--border-default)'
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {itemToEdit ? 'Edit Bounty' : 'Create New Bounty'}
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <form id="bounty-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Bounty Title</label>
              <input required name="title" value={formData.title} onChange={handleChange} className="admin-input" placeholder="e.g. Graded Base Set Charizard" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Game</label>
                <select name="game" value={formData.game} onChange={handleChange} className="admin-input">
                  {dynamicGames.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange} className="admin-input">
                  <option value="High Priority">High Priority</option>
                  <option value="Medium Priority">Medium Priority</option>
                  <option value="Wanted">Wanted</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Reward Text</label>
              <input required name="rewardText" value={formData.rewardText} onChange={handleChange} className="admin-input" placeholder="e.g. Will pay cash / Trade available" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Card Image (Cloudinary)</label>
              {formData.imageUrl && (
                <div style={{ position: 'relative', width: '120px', aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
                  <Image src={formData.imageUrl} alt="Preview" fill style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px' }}>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem', cursor: 'pointer' }}>
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {uploading ? 'Uploading...' : 'Upload File'}
                  <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>
            </div>
            
          </form>
        </div>

        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" form="bounty-form" disabled={saving || uploading} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '8px', border: 'none', background: 'var(--hat-green-500)', color: 'white', fontWeight: 600, cursor: (saving || uploading) ? 'not-allowed' : 'pointer', opacity: (saving || uploading) ? 0.7 : 1 }}>
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Bounty'}
          </button>
        </div>
      </div>
    </>
  );
}
