'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';

export default function PinWall() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) return;
    
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/auth/pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      if (res.ok) {
        // Refresh the page to trigger the layout server-side check
        router.refresh();
      } else {
        setError(true);
        setPin('');
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-base)',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '380px',
        width: '100%',
        padding: '40px 32px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '64px', height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #064e3b, #10b981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)'
          }}>
            <Lock size={28} color="white" />
          </div>
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          margin: '0 0 8px 0'
        }}>
          Control Room
        </h1>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          margin: '0 0 32px 0'
        }}>
          Enter your 4-digit operational PIN to access the dashboard.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/[^0-9]/g, ''));
                setError(false);
              }}
              placeholder="••••"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '2rem',
                letterSpacing: '0.5em',
                textAlign: 'center',
                background: 'var(--bg-elevated)',
                border: `2px solid ${error ? '#ef4444' : 'var(--border-default)'}`,
                borderRadius: '12px',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'monospace'
              }}
              autoFocus
            />
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#ef4444', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldAlert size={14} /> Incorrect PIN
            </div>
          )}

          <button
            type="submit"
            disabled={pin.length !== 4 || loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '16px',
              background: pin.length === 4 
                ? 'linear-gradient(135deg, #064e3b, #10b981)'
                : 'var(--bg-elevated)',
              color: pin.length === 4 ? 'white' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: pin.length === 4 && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? 'Authenticating...' : 'Enter Vault'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
