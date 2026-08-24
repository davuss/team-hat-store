'use client';

import { ArrowRight, Layers, Star, TrendingUp, Shield, Zap } from 'lucide-react';

const GAME_PILLS = [
  { label: 'Pokémon TCG',         color: '#fbbf24', bg: 'rgba(251,191,36,0.12)'   },
  { label: 'One Piece TCG',        color: '#f87171', bg: 'rgba(248,113,113,0.12)'  },
  { label: 'Disney Lorcana',       color: '#a78bfa', bg: 'rgba(167,139,250,0.12)'  },
  { label: 'Topps Premier League', color: '#34d399', bg: 'rgba(52,211,153,0.12)'   },
  { label: 'LoL Riftbound',        color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'   },
  { label: 'Team HAT Merch',       color: '#fcd34d', bg: 'rgba(252,211,77,0.12)'   },
];

const STATS = [
  { icon: Layers,     value: '500+',  label: 'Cards Listed'    },
  { icon: Star,       value: '6',     label: 'TCG Collections' },
  { icon: TrendingUp, value: '100%',  label: 'Verified NM'     },
  { icon: Shield,     value: 'SAR',   label: 'Local Pricing'   },
];

// Floating card visuals for hero background
const FLOATING_CARDS = [
  { top: '15%', left: '8%',  rotate: '-8deg',  delay: '0s',   scale: 1,    opacity: 0.6 },
  { top: '60%', left: '4%',  rotate: '5deg',   delay: '1.5s', scale: 0.85, opacity: 0.4 },
  { top: '20%', right: '6%', rotate: '10deg',  delay: '0.8s', scale: 0.9,  opacity: 0.55 },
  { top: '65%', right: '5%', rotate: '-5deg',  delay: '2s',   scale: 0.75, opacity: 0.35 },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Team HAT Cardhouse hero section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '80px',
        background: `
          radial-gradient(ellipse 80% 50% at 50% -10%, var(--hero-glow) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 85% 60%, rgba(251,191,36,0.05) 0%, transparent 50%),
          radial-gradient(ellipse 40% 30% at 15% 70%, rgba(16,185,129,0.06) 0%, transparent 50%),
          var(--bg-base)
        `,
      }}
    >
      {/* ─── Background grid ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(6,78,59,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,78,59,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* ─── Floating card silhouettes ─────────────────────────── */}
      {FLOATING_CARDS.map((card, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: card.top,
            left: (card as any).left,
            right: (card as any).right,
            width: '80px',
            height: '112px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(6,78,59,0.4), rgba(16,185,129,0.1))',
            border: '1px solid rgba(16,185,129,0.2)',
            transform: `rotate(${card.rotate}) scale(${card.scale})`,
            opacity: card.opacity,
            animation: `float 6s ease-in-out ${card.delay} infinite`,
            backdropFilter: 'blur(4px)',
          }}
        />
      ))}

      {/* ─── Main content ─────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '780px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {/* Live badge */}
        <div
          id="hero-live-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: '1px solid rgba(16,185,129,0.3)',
            background: 'rgba(16,185,129,0.08)',
            marginBottom: '32px',
            color: '#34d399',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              position: 'relative',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'inline-block',
            }}
            className="pulse-dot"
          />
          Live Inventory — Updated in Real Time
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '20px',
            color: '#f1f5f9',
            letterSpacing: '-0.03em',
          }}
        >
          The Official{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #34d399, #6ee7b7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Team HAT
          </span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Card Vault
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#94a3b8',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '580px',
            margin: '0 auto 40px',
          }}
        >
          Browse, trade, and acquire premium trading cards from our personal collection.
          Pokémon, One Piece, Lorcana, Topps, Riftbound & exclusive Team HAT merch —
          all in one place.
        </p>

        {/* CTA buttons */}
        <div
          id="hero-cta-buttons"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center',
            marginBottom: '56px',
          }}
        >
          <a
            href="/vault"
            id="hero-cta-primary"
            className="shine-on-hover"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #064e3b, #10b981)',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 700,
              transition: 'all 0.25s ease',
              boxShadow: '0 0 30px rgba(16,185,129,0.25)',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(16,185,129,0.4)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(16,185,129,0.25)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <Zap size={18} strokeWidth={2.5} />
            Browse the Vault
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <a
            href="/showcase"
            id="hero-cta-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 32px',
              borderRadius: '9px',
              background: 'transparent',
              color: '#cbd5e1',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              border: '1px solid rgba(71,85,105,0.7)',
              transition: 'all 0.25s ease',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#047857';
              (e.currentTarget as HTMLElement).style.color = '#34d399';
              (e.currentTarget as HTMLElement).style.background = 'rgba(6,78,59,0.15)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(71,85,105,0.7)';
              (e.currentTarget as HTMLElement).style.color = '#cbd5e1';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            View Showcase
          </a>
        </div>

        {/* Game pills */}
        <div
          id="hero-game-pills"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '64px',
          }}
        >
          {GAME_PILLS.map(({ label, color, bg }) => (
            <span
              key={label}
              style={{
                padding: '5px 13px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color,
                background: bg,
                border: `1px solid ${color}30`,
                letterSpacing: '0.03em',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Stats bar ────────────────────────────────────────── */}
      <div
        id="hero-stats"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '860px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1px',
            background: 'var(--border-default)',
            border: '1px solid var(--border-default)',
            borderRadius: '14px',
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
          }}
        >
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '24px 20px',
                background: 'var(--bg-card)',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)';
              }}
            >
              <Icon size={22} color="#10b981" strokeWidth={2} />
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #34d399, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                }}
              >
                {value}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
