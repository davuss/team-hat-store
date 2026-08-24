import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Header />
        <main id="main-content" role="main">
          {children}
        </main>
        <footer
          id="site-footer"
          role="contentinfo"
          style={{
            borderTop: '1px solid rgba(6,78,59,0.3)',
            background: '#020617',
            padding: '32px 24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: '#475569',
              fontSize: '0.85rem',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()}{' '}
            <span style={{ color: '#34d399', fontWeight: 600 }}>Team HAT</span>
            {' '}— All inventory prices in Saudi Riyal (SAR). For inquiries, contact us on socials.
          </p>
        </footer>
      </body>
    </html>
  );
}
