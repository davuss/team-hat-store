'use client';

import { useState, useEffect } from 'react';
import { getDynamicConfigs, updateDynamicConfig } from '@/app/actions/config';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [games, setGames] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [finishes, setFinishes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDynamicConfigs().then((data) => {
      setGames(data.games);
      setConditions(data.conditions);
      setFinishes(data.finishes);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await Promise.all([
      updateDynamicConfig('config_games', games),
      updateDynamicConfig('config_conditions', conditions),
      updateDynamicConfig('config_finishes', finishes),
    ]);
    setSaving(false);
  };

  if (loading) return <div className="p-12 text-center text-[var(--text-muted)]">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-2">Dynamic Configuration</h1>
          <p className="text-[var(--text-muted)] text-sm">Manage the dropdown options available when adding new inventory.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save Changes
        </button>
      </div>

      <div className="grid gap-8">
        <ConfigSection title="Game Categories" items={games} setItems={setGames} placeholder="e.g. Flesh & Blood" />
        <ConfigSection title="Card Conditions" items={conditions} setItems={setConditions} placeholder="e.g. Played" />
        <ConfigSection title="Foil & Finishes" items={finishes} setItems={setFinishes} placeholder="e.g. Cold Foil" />
      </div>
    </div>
  );
}

function ConfigSection({ title, items, setItems, placeholder }: { title: string, items: string[], setItems: (i: string[]) => void, placeholder: string }) {
  const [newItem, setNewItem] = useState('');

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-[var(--text-secondary)] mb-4">{title}</h2>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--text-primary)]">
            {item}
            <button
              onClick={() => setItems(items.filter((_, i) => i !== idx))}
              className="text-[var(--text-muted)] hover:text-red-400 transition-colors ml-1"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={add} className="flex gap-3">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!newItem.trim()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] hover:border-emerald-500/50 text-[var(--text-secondary)] hover:text-emerald-400 font-medium rounded-xl transition-all disabled:opacity-50"
        >
          <Plus size={16} /> Add
        </button>
      </form>
    </div>
  );
}
