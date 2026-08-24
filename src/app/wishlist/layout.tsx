import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bounty Board | Team HAT',
  description: 'The Wishlist & Bounty Board. Cards we are actively looking to buy or trade for in KSA.',
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
