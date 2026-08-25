import { prisma } from '@/lib/prisma';
import AdminWishlistClient from './AdminWishlistClient';

export const revalidate = 0; // Always fresh for admin

export default async function AdminWishlistPage() {
  const items = await prisma.wishlistItem.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div style={{ padding: '32px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Wishlist & Bounties
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Manage the active bounties displayed on the public Wishlist page.
          </p>
        </div>
      </header>

      <AdminWishlistClient initialItems={items} />
    </div>
  );
}
