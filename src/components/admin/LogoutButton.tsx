'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/pin', { method: 'DELETE' });
      router.refresh();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '10px 16px', borderRadius: '8px',
        color: '#ef4444', background: 'transparent',
        border: 'none', cursor: 'pointer',
        fontSize: '0.85rem', fontWeight: 500,
        transition: 'all 0.2s',
        textAlign: 'left'
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'transparent';
      }}
    >
      <LogOut size={16} /> {loading ? 'Locking...' : 'Lock Vault'}
    </button>
  );
}
