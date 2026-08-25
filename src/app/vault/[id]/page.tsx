import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/../lib/prisma';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

export const revalidate = 60;

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ShowroomDetailsPage({ params }: PageProps) {
  const card = await prisma.card.findUnique({
    where: { id: params.id },
  });

  if (!card) {
    notFound();
  }

  const price = typeof card.priceSar === 'object' ? (card.priceSar as any).toNumber() : Number(card.priceSar);

  return (
    <div className="w-full bg-[var(--bg-base)] min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link 
          href="/vault" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '32px',
            transition: 'color 0.2s',
          }}
          className="hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={16} /> Back to Vault
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Image Section */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3/4',
            background: 'var(--bg-elevated)',
            borderRadius: '24px',
            border: '1px solid var(--border-default)',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}>
            {card.imageUrl ? (
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                No Image Available
              </div>
            )}
          </div>

          {/* Details Section */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px',
              alignSelf: 'flex-start'
            }}>
              {card.game}
            </div>

            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '16px'
            }}>
              {card.title}
            </h1>

            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--hat-green-400)', marginBottom: '32px' }}>
              {price.toFixed(2)} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>SAR</span>
            </div>

            {/* Grid of properties */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              padding: '24px 0',
              borderTop: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '40px'
            }}>
              <DetailItem label="Set Name" value={card.setName || 'N/A'} />
              <DetailItem label="Card Number" value={card.cardNumber || 'N/A'} />
              <DetailItem label="Rarity" value={card.rarity || 'N/A'} />
              <DetailItem label="Condition" value={card.condition} />
              <DetailItem label="Finish" value={card.finish} />
              <DetailItem label="Language" value={card.language} />
            </div>

            {/* CTA */}
            <div style={{ marginTop: 'auto' }}>
              <AddToCartButton card={{
                id: card.id,
                slug: card.slug,
                title: card.title,
                game: card.game,
                setName: card.setName,
                condition: card.condition,
                finish: card.finish,
                priceSar: price,
                imageUrl: card.imageUrl,
                status: card.status
              }} />
              
              <div style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={16} color="#10b981" />
                Team HAT Verified Authentic
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      <span style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600 }}>
        {value}
      </span>
    </div>
  );
}
