'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Layers,
  Eye,
  Heart,
  Info,
  ShoppingBag,
  Zap,
} from 'lucide-react';

const NAV_LINKS = [
  { href: '/vault',     label: 'Trade Vault',       icon: Layers,     description: 'Cards for sale & trade' },
  { href: '/showcase',  label: 'Showcase',           icon: Eye,        description: 'The vault collection' },
  { href: '/wishlist',  label: 'Wishlist',           icon: Heart,      description: 'Cards we\'re hunting' },
  { href: '/about',     label: 'About',              icon: Info,       description: 'About Team HAT' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
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
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: isScrolled
          ? 'rgba(2, 6, 23, 0.92)'
          : 'rgba(2, 6, 23, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: isScrolled
          ? '1px solid rgba(6, 78, 59, 0.5)'
          : '1px solid rgba(6, 78, 59, 0.2)',
        boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
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
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #064e3b, #10b981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
              flexShrink: 0,
            }}
          >
            <ShoppingBag size={18} color="white" strokeWidth={2.5} />
          </div>
          {/* Wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #34d399, #6ee7b7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              Team HAT
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '0.65rem',
                color: '#94a3b8',
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
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
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
                padding: '8px 14px',
                borderRadius: '6px',
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#34d399';
                (e.currentTarget as HTMLElement).style.background = 'rgba(6,78,59,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <Icon size={15} strokeWidth={2} />
              {label}
            </Link>
          ))}

          {/* CTA button */}
          <a
            href="/vault"
            id="nav-cta"
            className="shine-on-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              marginLeft: '8px',
              borderRadius: '7px',
              background: 'linear-gradient(135deg, #064e3b, #10b981)',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              transition: 'all 0.25s ease',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.4)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <Zap size={14} strokeWidth={2.5} />
            Browse Cards
          </a>
        </nav>

        {/* ─── Mobile Hamburger ────────────────────────────── */}
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
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: '1px solid rgba(6, 78, 59, 0.4)',
            background: 'rgba(6, 78, 59, 0.15)',
            color: '#34d399',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          className="show-mobile"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ─── Mobile Dropdown ─────────────────────────────────── */}
      <div
        id="mobile-nav"
        aria-hidden={!isMobileOpen}
        style={{
          overflow: 'hidden',
          maxHeight: isMobileOpen ? '400px' : '0',
          transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          borderTop: isMobileOpen ? '1px solid rgba(6, 78, 59, 0.3)' : 'none',
          background: 'rgba(2, 6, 23, 0.97)',
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
                padding: '12px',
                borderRadius: '8px',
                textDecoration: 'none',
                marginBottom: '4px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(6,78,59,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '7px',
                  background: 'rgba(6,78,59,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={16} color="#34d399" />
              </div>
              <div>
                <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                  {label}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '1px' }}>
                  {description}
                </div>
              </div>
            </Link>
          ))}
          <a
            href="/vault"
            id="mobile-nav-cta"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              marginTop: '8px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #064e3b, #10b981)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            <Zap size={16} />
            Browse Cards
          </a>
        </div>
      </div>

      {/* Inline responsive styles */}
      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
