import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import ThemeProvider from '@/components/ThemeProvider';
import CartSheet from '@/components/CartSheet';

export const metadata: Metadata = {
  title: {
    default: 'Team HAT Cardhouse | Trade. Collect. Win.',
    template: '%s | Team HAT Cardhouse',
  },
  description:
    'Official trading card platform for Team HAT esports. Browse, trade, and acquire premium Pokémon, One Piece, Lorcana, Topps, Riftbound TCG cards and Team HAT merchandise.',
  keywords: [
    'Team HAT', 'trading cards', 'TCG', 'Pokémon', 'One Piece', 'Lorcana',
    'Topps Premier League', 'Riftbound', 'esports', 'Saudi Arabia', 'SAR',
  ],
  authors: [{ name: 'Team HAT', url: 'https://team-hat.org' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://store.team-hat.org',
    siteName: 'Team HAT Cardhouse',
    title: 'Team HAT Cardhouse | Trade. Collect. Win.',
    description: 'Official trading card platform for Team HAT esports.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TeamHATgg',
    creator: '@TeamHATgg',
  },
  metadataBase: new URL('https://store.team-hat.org'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <CartSheet />
          <main id="main-content" role="main" className="min-h-screen pt-24 pb-12">
            {children}
          </main>
          <footer
            id="site-footer"
            role="contentinfo"
            style={{
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-base)',
              padding: '32px 24px',
              textAlign: 'center',
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
              © {new Date().getFullYear()}{' '}
              <span style={{ color: 'var(--hat-green-400)', fontWeight: 600 }}>Team HAT</span>
              {' '}— All inventory prices in Saudi Riyal (SAR). For inquiries, contact us on socials.
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
