import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Package, Settings, LogOut, ExternalLink } from 'lucide-react';
import PinWall from '@/components/admin/PinWall';
import LogoutButton from '@/components/admin/LogoutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_session')?.value === 'authenticated';

  if (!isAuthenticated) {
    return <PinWall />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* ─── Sidebar ───────────────────────────────────────────── */}
      <aside style={{
        width: '260px',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
      }}>
        {/* Admin Logo Area */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Image
            src="/TeamHatHighRes2NoBG.png"
            alt="Team HAT Logo"
            width={32}
            height={38}
            style={{ objectFit: 'contain' }}
          />
          <div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0
            }}>Control Room</h2>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Admin Dashboard</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            href="/admin"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '8px',
              color: 'var(--text-secondary)', textDecoration: 'none',
              fontSize: '0.9rem', fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
            }}
          >
            <LayoutDashboard size={18} /> Overview
          </Link>

          <Link
            href="/admin/inventory"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.1)',
              color: 'var(--hat-green-400)', textDecoration: 'none',
              fontSize: '0.9rem', fontWeight: 600,
              border: '1px solid var(--border-subtle)'
            }}
          >
            <Package size={18} /> Inventory
          </Link>
          
          <Link
            href="/admin/settings"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '8px',
              color: 'var(--text-secondary)', textDecoration: 'none',
              fontSize: '0.9rem', fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
            }}
          >
            <Settings size={18} /> Settings
          </Link>
        </nav>

        {/* Footer Actions */}
        <div style={{ padding: '24px 16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px', borderRadius: '8px',
              color: 'var(--text-muted)', textDecoration: 'none',
              fontSize: '0.85rem', fontWeight: 500,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
          >
            <ExternalLink size={16} /> View Storefront
          </Link>
          
          <LogoutButton />
        </div>
      </aside>

      {/* ─── Main Content Area ─────────────────────────────────── */}
      <main style={{
        marginLeft: '260px',
        flex: 1,
        minHeight: '100vh',
        background: 'var(--bg-base)',
        position: 'relative' // Ensure z-index context is clean
      }}>
        {children}
      </main>
    </div>
  );
}
