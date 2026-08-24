import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/../lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Remove fields that shouldn't be updated directly via this generic object if needed
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;

    if (typeof data.priceSar === 'number') {
      data.priceSar = data.priceSar.toString();
    }
    if (data.stockQty) {
      data.stockQty = parseInt(data.stockQty, 10);
    }

    const card = await prisma.card.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, card });
  } catch (error: any) {
    console.error('Error updating card:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Hard delete
    await prisma.card.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting card:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
