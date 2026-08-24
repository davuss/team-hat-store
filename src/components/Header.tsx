'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
  Menu, X, Layers, Eye, Heart, Info,
  Zap, Sun, Moon, ShoppingBag,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const NAV_LINKS = [
  { href: '/vault',    label: 'Trade Vault', icon: Layers, description: 'Cards for sale & trade' },
  { href: '/showcase', label: 'Showcase',    icon: Eye,    description: 'The vault collection'  },
  { href: '/wishlist', label: 'Wishlist',    icon: Heart,  description: "Cards we're hunting"  },
  { href: '/about',    label: 'About',       icon: Info,   description: 'About Team HAT'        },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div style={{ width: 36, height: 36 }} />
    );
  }

  const isDark = theme === 'dark';
  return (
    <button
      id="theme-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        border: '1px solid var(--border-default)',
        background: 'var(--bg-elevated)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--hat-green-500)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--hat-green-400)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-default)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
      }}
    >
      {isDark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
    </button>
  );
}

function CartButton() {
  const { itemCount, toggleCart } = useCartStore();
  const count = itemCount();

  return (
    <button
      id="cart-toggle-btn"
      aria-label={`Trade binder — ${count} card${count !== 1 ? 's' : ''} selected`}
      onClick={toggleCart}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '7px 14px',
        borderRadius: '8px',
        border: '1px solid var(--border-default)',
        background: count > 0
          ? 'linear-gradient(135deg, var(--hat-green-900), var(--hat-green-800))'
          : 'var(--bg-elevated)',
        color: count > 0 ? 'var(--hat-green-400)' : 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontWeight: 600,
        fontSize: '0.825rem',
        flexShrink: 0,
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--hat-green-500)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--hat-green-400)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-default)';
        if (count === 0) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
      }}
    >
      <ShoppingBag size={15} strokeWidth={2} />
      {count > 0 && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'var(--hat-green-500)',
            color: '#000',
            fontSize: '0.65rem',
            fontWeight: 800,
          }}
        >
          {count}
        </span>
      )}
      <span className="hidden-mobile">{count > 0 ? 'Binder' : 'Binder'}</span>
    </button>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="site-header"
      role="banner"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: isScrolled ? 'var(--nav-bg-scroll)' : 'var(--nav-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${isScrolled ? 'var(--border-default)' : 'var(--border-subtle)'}`,
        boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.15)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        {/* ─── Logo ─────────────────────────────────────────── */}
        <Link
          href="/"
          id="site-logo"
          aria-label="Team HAT Cardhouse — Home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <Image
            src="/TeamHatHighRes2NoBG.png"
            alt="Team HAT Logo"
            width={48}
            height={56}
            style={{ objectFit: 'contain' }}
            priority
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '1.05rem',
                color: 'var(--hat-green-400)',
                letterSpacing: '-0.02em',
              }}
            >
              Team HAT
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              Cardhouse
            </span>
          </div>
        </Link>

        {/* ─── Desktop Nav ─────────────────────────────────── */}
        <nav
          id="desktop-nav"
          aria-label="Main navigation"
          style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              id={`nav-${label.toLowerCase().replace(/\s/g, '-')}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 13px',
                borderRadius: '6px',
                color: 'var(--nav-link)',
                textDecoration: 'none',
                fontSize: '0.86rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--nav-link-hover)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--nav-link)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </Link>
          ))}

          {/* Browse CTA */}
          <a
            href="/vault"
            id="nav-cta"
            className="shine-on-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 17px',
              marginLeft: '6px',
              borderRadius: '7px',
              background: 'linear-gradient(135deg, #064e3b, #10b981)',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.86rem',
              fontWeight: 600,
              transition: 'all 0.25s ease',
              boxShadow: '0 0 20px rgba(16,185,129,0.2)',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(16,185,129,0.4)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(16,185,129,0.2)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <Zap size={13} strokeWidth={2.5} />
            Browse
          </a>
        </nav>

        {/* ─── Right controls: Cart + Theme + Hamburger ──────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {mounted && <CartButton />}
          <ThemeToggle />
          <button
            id="mobile-menu-btn"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              border: '1px solid var(--border-default)',
              background: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            className="show-mobile"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Dropdown ─────────────────────────────────── */}
      <div
        id="mobile-nav"
        aria-hidden={!isMobileOpen}
        style={{
          overflow: 'hidden',
          maxHeight: isMobileOpen ? '420px' : '0',
          transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
          borderTop: isMobileOpen ? '1px solid var(--border-subtle)' : 'none',
          background: 'var(--nav-bg-scroll)',
        }}
      >
        <div style={{ padding: '12px 24px 20px' }}>
          {NAV_LINKS.map(({ href, label, icon: Icon, description }) => (
            <Link
              key={href}
              href={href}
              id={`mobile-nav-${label.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => setIsMobileOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px',
                borderRadius: '8px',
                textDecoration: 'none',
                marginBottom: '4px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <div
                style={{
                  width: '32px', height: '32px',
                  borderRadius: '7px',
                  background: 'rgba(6,78,59,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={15} color="var(--hat-green-400)" />
              </div>
              <div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                  {label}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.73rem', marginTop: '1px' }}>
                  {description}
                </div>
              </div>
            </Link>
          ))}
          <a
            href="/vault"
            id="mobile-nav-cta"
            onClick={() => setIsMobileOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '11px',
              marginTop: '8px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #064e3b, #10b981)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            <Zap size={15} />
            Browse Cards
          </a>
        </div>
      </div>
    </header>
  );
}
