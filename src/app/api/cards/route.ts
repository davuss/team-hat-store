import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Auto-generate slug if not provided
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    }
    
    // Convert price to string/Decimal for Prisma
    if (typeof data.priceSar === 'number') {
      data.priceSar = data.priceSar.toString();
    }

    const card = await prisma.card.create({
      data: {
        slug: data.slug,
        title: data.title,
        game: data.game,
        setName: data.setName || '',
        cardNumber: data.cardNumber || '',
        rarity: data.rarity || 'Common',
        finish: data.finish || 'Normal',
        condition: data.condition || 'NM',
        language: data.language || 'English',
        priceSar: data.priceSar,
        stockQty: parseInt(data.stockQty, 10) || 1,
        status: data.status || 'AVAILABLE',
        imageUrl: data.imageUrl || '',
        isFeatured: data.isFeatured || false,
      }
    });

    return NextResponse.json({ success: true, card });
  } catch (error: any) {
    console.error('Error creating card:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
