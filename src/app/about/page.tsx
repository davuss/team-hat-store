import type { Metadata } from 'next';
import { ShieldCheck, Truck, Users } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About | Team HAT',
  description: 'Our mission and trust pillars for the Saudi TCG market.',
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '24px', display: 'inline-block', border: '1px solid var(--border-default)' }}>
              <Image src="/TeamHatHighRes2NoBG.png" alt="Team HAT" width={80} height={95} />
            </div>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '3.5rem', fontWeight: 800, marginBottom: '24px' }}>
            Elevating the Hobby in KSA
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
            Team HAT Cardhouse is a premium digital trade binder and trading hub for the esports and TCG community in Saudi Arabia.
          </p>
        </div>

        {/* Three Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '80px' }}>
          {/* Pillar 1 */}
          <div style={{ background: 'var(--bg-surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--hat-green-500)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Truck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Local to KSA</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Say goodbye to international shipping delays, high import taxes, and lost packages. We operate locally, ensuring fast delivery and direct trades within Saudi Arabia.
            </p>
          </div>

          {/* Pillar 2 */}
          <div style={{ background: 'var(--bg-surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--hat-green-500)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>100% Verified</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Trust is everything. Every high-value card comes with an optional WhatsApp video condition check before purchase. No surprises, just authentic cards.
            </p>
          </div>

          {/* Pillar 3 */}
          <div style={{ background: 'var(--bg-surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--hat-green-500)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Community First</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Rooted in the esports and digital TCG scenes like Gods Unchained. We are collectors first, businessmen second. We aim to grow the local hobby.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
