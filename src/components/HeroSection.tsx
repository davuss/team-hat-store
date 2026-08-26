'use client';

import { ArrowRight, Layers, Star, TrendingUp, Shield, Zap } from 'lucide-react';

const GAME_PILLS = [
  { label: 'Pokémon TCG',         className: 'border-amber-500 text-amber-700 dark:text-yellow-400 dark:border-yellow-400/30' },
  { label: 'One Piece TCG',        className: 'border-red-600 text-red-700 dark:text-red-400 dark:border-red-400/30' },
  { label: 'Disney Lorcana',       className: 'border-purple-600 text-purple-700 dark:text-purple-400 dark:border-purple-400/30' },
  { label: 'Topps Premier League', className: 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400/30' },
  { label: 'LoL Riftbound',        className: 'border-blue-600 text-blue-700 dark:text-blue-400 dark:border-blue-400/30' },
  { label: 'Team HAT Merch',       className: 'border-amber-600 text-amber-700 dark:text-yellow-400 dark:border-yellow-400/30' },
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
          className="hidden dark:block"
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
            color: 'var(--text-primary)',
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
            className="bg-clip-text text-transparent bg-gradient-to-br from-amber-600 to-amber-500 dark:from-yellow-400 dark:to-yellow-300"
          >
            Card Vault
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-slate-600 dark:text-slate-300"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[9px] text-slate-700 dark:text-[var(--text-primary)] font-semibold border border-slate-300 dark:border-[var(--border-default)] shadow-sm dark:shadow-none transition-all duration-250 bg-white dark:bg-transparent hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/15 hover:-translate-y-0.5"
            style={{ letterSpacing: '0.01em' }}
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
          {GAME_PILLS.map(({ label, className }) => (
            <span
              key={label}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border bg-white dark:bg-[var(--bg-elevated)] shadow-sm dark:shadow-none ${className}`}
              style={{ letterSpacing: '0.03em' }}
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
          className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-slate-200 dark:bg-[var(--border-default)] border border-slate-200 dark:border-[var(--border-default)] shadow-md dark:shadow-none rounded-[14px] overflow-hidden backdrop-blur-md"
        >
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 py-6 px-5 bg-white dark:bg-[var(--bg-card)] hover:bg-slate-50 dark:hover:bg-[var(--bg-elevated)] transition-colors duration-200"
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
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
