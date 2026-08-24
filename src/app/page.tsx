'use client';

import HeroSection from '@/components/HeroSection';
import { Layers, Eye, Heart, ArrowRight } from 'lucide-react';

const FEATURE_CARDS = [
  {
    id: 'feature-trade-vault',
    icon: Layers,
    iconColor: '#10b981',
    iconBg: 'rgba(16,185,129,0.1)',
    title: 'Trade Vault',
    description:
      'Browse all cards available for sale or trade. Filter by game, condition, and price range.',
    href: '/vault',
    linkText: 'Open Vault',
    borderColor: 'rgba(16,185,129,0.2)',
    hoverBorder: 'rgba(16,185,129,0.5)',
  },
  {
    id: 'feature-showcase',
    icon: Eye,
    iconColor: '#a78bfa',
    iconBg: 'rgba(167,139,250,0.1)',
    title: 'Showcase Collection',
    description:
      'Explore vault-locked showcase pieces — rare and graded cards held for display or long-term value.',
    href: '/showcase',
    linkText: 'View Showcase',
    borderColor: 'rgba(167,139,250,0.2)',
    hoverBorder: 'rgba(167,139,250,0.5)',
  },
  {
    id: 'feature-wishlist',
    icon: Heart,
    iconColor: '#f87171',
    iconBg: 'rgba(248,113,113,0.1)',
    title: 'Wishlist',
    description:
      'Cards we\'re actively hunting. If you have something on the list, reach out — let\'s make a deal.',
    href: '/wishlist',
    linkText: 'See Wishlist',
    borderColor: 'rgba(248,113,113,0.2)',
    hoverBorder: 'rgba(248,113,113,0.5)',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ─── Feature Grid ─────────────────────────────────────── */}
      <section
        id="features"
        aria-labelledby="features-heading"
        style={{
          padding: '100px 24px',
          background: '#0f172a',
          position: 'relative',
        }}
      >
        {/* Section glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent)',
          }}
        />

        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'rgba(6,78,59,0.3)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#34d399',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Explore
            </span>
            <h2
              id="features-heading"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: 800,
                color: '#f1f5f9',
                letterSpacing: '-0.03em',
                marginBottom: '16px',
              }}
            >
              Everything in One Place
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
              Trade binder, showcase vault, and wishlist — all managed by the Team HAT crew.
            </p>
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {FEATURE_CARDS.map(
              ({ id, icon: Icon, iconColor, iconBg, title, description, href, linkText, borderColor, hoverBorder }) => (
                <div
                  key={id}
                  id={id}
                  className="card-hover"
                  style={{
                    padding: '32px',
                    borderRadius: '14px',
                    background: 'rgba(30,41,59,0.4)',
                    border: `1px solid ${borderColor}`,
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = hoverBorder;
                    (e.currentTarget as HTMLElement).style.background = 'rgba(30,41,59,0.7)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = borderColor;
                    (e.currentTarget as HTMLElement).style.background = 'rgba(30,41,59,0.4)';
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={24} color={iconColor} strokeWidth={2} />
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#e2e8f0',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {title}
                  </h3>

                  <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '24px', fontSize: '0.92rem' }}>
                    {description}
                  </p>

                  <a
                    href={href}
                    id={`${id}-link`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: iconColor,
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      transition: 'gap 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.gap = '10px';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.gap = '6px';
                    }}
                  >
                    {linkText}
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </a>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Banner ────────────────────────────────── */}
      <section
        id="bottom-cta"
        aria-labelledby="bottom-cta-heading"
        style={{
          padding: '80px 24px',
          background: '#020617',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(6,78,59,0.2) 0%, transparent 70%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            id="bottom-cta-heading"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: '#f1f5f9',
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Ready to Make a{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Deal?
            </span>
          </h2>
          <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '1rem' }}>
            All prices in Saudi Riyal (SAR). DM us on socials to arrange trades.
          </p>
          <a
            href="/vault"
            id="bottom-cta-btn"
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '14px 36px' }}
          >
            Browse the Vault
            <ArrowRight size={18} strokeWidth={2.5} />
          </a>
        </div>
      </section>
    </>
  );
}
