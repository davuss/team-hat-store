// ============================================================
// TEAM HAT CARDHOUSE — Trade Binder (Cart) Store
// PROMPT-02: Zustand global state for the WhatsApp proposal cart
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartCard {
  id:        string;
  slug:      string;
  title:     string;
  game:      string;
  setName:   string;
  condition: string;
  finish:    string;
  priceSar:  number;
  imageUrl:  string;
  status:    string;
}

interface CartStore {
  items:      CartCard[];
  isOpen:     boolean;

  addItem:    (card: CartCard) => void;
  removeItem: (id: string) => void;
  clearCart:  () => void;
  openCart:   () => void;
  closeCart:  () => void;
  toggleCart: () => void;

  totalSar:   () => number;
  itemCount:  () => number;
  hasItem:    (id: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items:  [],
      isOpen: false,

      addItem: (card) => {
        const exists = get().items.find((i) => i.id === card.id);
        if (!exists) {
          set((state) => ({ items: [...state.items, card], isOpen: true }));
        }
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clearCart: () => set({ items: [] }),

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalSar:  () => get().items.reduce((sum, i) => sum + i.priceSar, 0),
      itemCount: () => get().items.length,
      hasItem:   (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: 'teamhat-cart',
      // Only persist items, not UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ─── WhatsApp URL builder ─────────────────────────────────────
const WHATSAPP_NUMBER = '966XXXXXXXXX'; // TODO: link to SystemConfig in future prompt

export function buildWhatsAppUrl(items: CartCard[]): string {
  if (items.length === 0) return '#';

  const total = items.reduce((sum, i) => sum + i.priceSar, 0);

  const cardLines = items
    .map((i) => `- ${i.title} (${i.condition}) — ${i.priceSar.toFixed(2)} SAR`)
    .join('\n');

  const message = [
    `Salam! I am interested in these cards from Team HAT Cardhouse:`,
    '',
    cardLines,
    '',
    `Total: ${total.toFixed(2)} SAR`,
    '',
    `store.team-hat.org`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
