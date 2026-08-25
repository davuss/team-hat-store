'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getWishlistItems() {
  return await prisma.wishlistItem.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createWishlistItem(data: {
  title: string;
  game: string;
  priority: string;
  rewardText: string;
  imageUrl: string;
}) {
  const item = await prisma.wishlistItem.create({
    data,
  });
  
  revalidatePath('/wishlist');
  revalidatePath('/admin/wishlist');
  return item;
}

export async function updateWishlistItem(
  id: string,
  data: {
    title: string;
    game: string;
    priority: string;
    rewardText: string;
    imageUrl: string;
  }
) {
  const item = await prisma.wishlistItem.update({
    where: { id },
    data,
  });
  
  revalidatePath('/wishlist');
  revalidatePath('/admin/wishlist');
  return item;
}

export async function deleteWishlistItem(id: string) {
  await prisma.wishlistItem.delete({
    where: { id },
  });
  
  revalidatePath('/wishlist');
  revalidatePath('/admin/wishlist');
}
