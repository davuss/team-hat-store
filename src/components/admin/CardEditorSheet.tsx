'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Upload, Save, Loader2 } from 'lucide-react';
import { CARD_STATUSES } from '@/types/card';
import { getDynamicConfigs } from '@/app/actions/config';
import Image from 'next/image';

interface CardEditorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cardToEdit?: any | null; // Pass null for new card
}

export default function CardEditorSheet({ isOpen, onClose, cardToEdit }: CardEditorSheetProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Dynamic Configs
  const [dynamicGames, setDynamicGames] = useState<string[]>(['Pokémon']);
  const [dynamicConditions, setDynamicConditions] = useState<string[]>(['Near Mint (NM)']);
  const [dynamicFinishes, setDynamicFinishes] = useState<string[]>(['Normal']);

  useEffect(() => {
    getDynamicConfigs().then(data => {
      setDynamicGames(data.games.length ? data.games : ['Pokémon']);
      setDynamicConditions(data.conditions.length ? data.conditions : ['Near Mint (NM)']);
      setDynamicFinishes(data.finishes.length ? data.finishes : ['Normal']);
    });
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    game: 'Pokémon',
    setName: '',
    cardNumber: '',
    rarity: 'Common',
    condition: 'Near Mint (NM)',
    finish: 'Normal',
    language: 'English',
    status: 'AVAILABLE',
    priceSar: '0',
    stockQty: '1',
    imageUrl: '',
    isFeatured: false,
  });

  useEffect(() => {
    if (cardToEdit) {
      setFormData({
        title: cardToEdit.title || '',
        game: cardToEdit.game || 'Pokémon',
        setName: cardToEdit.setName || '',
        cardNumber: cardToEdit.cardNumber || '',
        rarity: cardToEdit.rarity || 'Common',
        condition: cardToEdit.condition || 'Near Mint (NM)',
        finish: cardToEdit.finish || 'Normal',
        language: cardToEdit.language || 'English',
        status: cardToEdit.status || 'AVAILABLE',
        priceSar: cardToEdit.priceSar?.toString() || '0',
        stockQty: cardToEdit.stockQty?.toString() || '1',
        imageUrl: cardToEdit.imageUrl || '',
        isFeatured: cardToEdit.isFeatured || false,
      });
    } else {
      setFormData({
        title: '', game: 'Pokémon', setName: '', cardNumber: '', rarity: 'Common',
        condition: 'Near Mint (NM)', finish: 'Normal', language: 'English', status: 'AVAILABLE',
        priceSar: '0', stockQty: '1', imageUrl: '', isFeatured: false,
      });
    }
  }, [cardToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
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
      const url = cardToEdit ? `/api/cards/${cardToEdit.id}` : '/api/cards';
      const method = cardToEdit ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        priceSar: parseFloat(formData.priceSar) || 0,
        stockQty: parseInt(formData.stockQty, 10) || 1,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.refresh();
        onClose();
      } else {
        alert('Failed to save card.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving card.');
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
        borderLeft: '1px solid var(--border-default)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        animation: 'slide-in-right 0.3s forwards'
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontFamily: "'Space Grotesk', sans-serif" }}>
            {cardToEdit ? 'Edit Card' : 'Add New Card'}
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <form id="card-editor-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Image Upload */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Card Image</label>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '80px', height: '112px',
                  background: 'var(--bg-elevated)', borderRadius: '8px',
                  border: '1px solid var(--border-default)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', position: 'relative'
                }}>
                  {formData.imageUrl ? (
                    <Image src={formData.imageUrl} alt="Preview" fill style={{ objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '2rem' }}>🃏</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-upload" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '8px 16px', background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)', borderRadius: '6px',
                    color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem',
                    transition: 'all 0.2s'
                  }}>
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </label>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Or paste URL below:
                  </p>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    style={{
                      width: '100%', padding: '8px 12px', borderRadius: '6px',
                      background: 'var(--bg-base)', border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)', fontSize: '0.85rem', marginTop: '4px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Title & Game */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Game</label>
                <select name="game" value={formData.game} onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                  {dynamicGames.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                  {CARD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Set & Number */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Set Name</label>
                <input type="text" name="setName" value={formData.setName} onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Card Number</label>
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} />
              </div>
            </div>

            {/* Meta */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Condition</label>
                <select name="condition" value={formData.condition} onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                  {dynamicConditions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Finish</label>
                <select name="finish" value={formData.finish} onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                  {dynamicFinishes.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            {/* Price & Stock */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Price (SAR)</label>
                <input required type="number" step="0.01" min="0" name="priceSar" value={formData.priceSar} onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Stock Qty</label>
                <input required type="number" min="0" name="stockQty" value={formData.stockQty} onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} />
              </div>
            </div>

            {/* Featured */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '10px' }}>
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange}
                style={{ width: '18px', height: '18px', accentColor: 'var(--hat-green-500)' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Featured Card (Show on Homepage)</span>
            </label>

          </form>
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '12px' }}>
          <button onClick={onClose} type="button" style={{
            flex: 1, padding: '12px', borderRadius: '8px',
            background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
            color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button form="card-editor-form" type="submit" disabled={saving || uploading} style={{
            flex: 1, padding: '12px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #064e3b, #10b981)', border: 'none',
            color: 'white', fontWeight: 600, cursor: (saving || uploading) ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Card'}
          </button>
        </div>
      </div>
    </>
  );
}
