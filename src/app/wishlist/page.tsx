'use client';

import type { Metadata } from 'next';
import { Target, Search, MessageCircle } from 'lucide-react';
import Image from 'next/image';


const BOUNTIES = [
  {
    id: 1,
    title: 'Any Graded Base Set Charizard',
    priority: 'High Priority',
    priorityColor: '#ef4444',
    game: 'Pokémon TCG',
    action: 'Will pay cash / High-end trade',
    image: 'https://images.pokemontcg.io/base1/4_hires.png',
  },
  {
    id: 2,
    title: 'One Piece Manga Rare Zoro',
    priority: 'Medium Priority',
    priorityColor: '#f59e0b',
    game: 'One Piece CG',
    action: 'Trade Available',
    image: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP06-118_p1.png',
  },
  {
    id: 3,
    title: 'Lorcana Enchanted Tinker Bell',
    priority: 'Wanted',
    priorityColor: '#3b82f6',
    game: 'Disney Lorcana',
    action: 'Will pay cash',
    image: 'https://sixfortyfive.com/wp-content/uploads/2023/08/Tinker-Bell-Enchanted.jpg',
  },
];

export default function WishlistPage() {
  const WHATSAPP_NUMBER = '966500000000'; // Fallback
  const message = encodeURIComponent('Hello Team HAT! I have a card from your Bounty Board and I want to trade/sell it.');
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <div className="w-full bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header Section */}
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            padding: '8px 16px', borderRadius: '999px', 
            background: 'rgba(239,68,68,0.1)', color: '#ef4444',
            fontWeight: 700, fontSize: '0.9rem', marginBottom: '24px'
          }}>
            <Target size={18} /> Active Bounties
          </div>
          
          <h1 style={{ 
            fontFamily: "'Space Grotesk', sans-serif", fontSize: '3.5rem', fontWeight: 800, 
            lineHeight: 1.1, marginBottom: '24px', color: 'var(--text-primary)'
          }}>
            The Bounty Board
          </h1>
          
          <p style={{ 
            color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 
          }}>
            We are actively hunting for these specific cards. If you have one of these items in KSA, let's make a deal.
          </p>

          <a 
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 28px', borderRadius: '12px',
              background: 'var(--hat-green-500)', color: '#fff',
              fontWeight: 600, textDecoration: 'none',
              marginTop: '32px', transition: 'all 0.2s',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.3)';
            }}
          >
            <MessageCircle size={20} />
            Have one? Send a WhatsApp Message
          </a>
        </header>

        {/* Bounties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {BOUNTIES.map((bounty) => (
            <div key={bounty.id} style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: 'var(--bg-elevated)' }}>
                <Image
                  src={bounty.image}
                  alt={bounty.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: bounty.priorityColor, color: '#fff',
                  padding: '6px 12px', borderRadius: '8px',
                  fontSize: '0.8rem', fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  {bounty.priority}
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {bounty.game}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.3 }}>
                  {bounty.title}
                </h3>
                
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--hat-green-400)', fontWeight: 600 }}>
                  <Search size={16} />
                  {bounty.action}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
