// ============================================================
// TEAM HAT CARDHOUSE — Card Type Definitions
// PROMPT-01: Frontend TypeScript types and enums
// These mirror the String fields in prisma/schema.prisma and
// provide compile-time safety and IDE autocomplete.
// ============================================================

// ─── Game ───────────────────────────────────────────────────
export const GAMES = [
  'Pokemon',
  'OnePiece',
  'Lorcana',
  'Topps',
  'Riftbound',
  'Merch',
] as const;

export type Game = (typeof GAMES)[number];

export const GAME_LABELS: Record<string, string> = {
  Pokémon: 'Pokémon',
  'One Piece': 'One Piece',
  'Disney Lorcana': 'Disney Lorcana',
  Topps: 'Topps Premier League',
  Riftbound: 'LoL Riftbound',
  Merch: 'Team HAT Merch',
};

// ─── Card Status ─────────────────────────────────────────────
export const CARD_STATUSES = [
  'AVAILABLE',
  'TRADE_ONLY',
  'VAULT',
  'ARCHIVED',
] as const;

export type CardStatus = (typeof CARD_STATUSES)[number];

export const STATUS_LABELS: Record<CardStatus, string> = {
  AVAILABLE: 'For Sale / Trade',
  TRADE_ONLY: 'Trade Only',
  VAULT: 'Vault (Showcase)',
  ARCHIVED: 'Sold / Archived',
};

export const STATUS_COLORS: Record<CardStatus, string> = {
  AVAILABLE:  'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  TRADE_ONLY: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  VAULT:      'text-blue-400 bg-blue-400/10 border-blue-400/30',
  ARCHIVED:   'text-slate-400 bg-slate-400/10 border-slate-400/30',
};

// ─── Condition ───────────────────────────────────────────────
export const CONDITIONS = ['NM', 'LP', 'MP', 'Graded'] as const;

export type Condition = (typeof CONDITIONS)[number];

export const CONDITION_LABELS: Record<string, string> = {
  Mint: 'Mint',
  'Near Mint (NM)': 'Near Mint (NM)',
  'Lightly Played (LP)': 'Lightly Played (LP)',
  'Moderately Played (MP)': 'Moderately Played (MP)',
  Graded: 'Graded (PSA/BGS)',
};

// ─── Language ────────────────────────────────────────────────
export const LANGUAGES = ['English', 'Japanese', 'Arabic'] as const;

export type Language = (typeof LANGUAGES)[number];

// ─── Finish ──────────────────────────────────────────────────
export const FINISHES = [
  'Normal',
  'Holo',
  'Textured',
  'Foil',
  'ReverseHolo',
  'FullArt',
  'AlternateArt',
] as const;

export type Finish = (typeof FINISHES)[number];

export const FINISH_LABELS: Record<string, string> = {
  Normal:       'Normal',
  Holo:         'Holo',
  Textured:     'Textured',
  Foil:         'Foil',
  'Reverse Holo': 'Reverse Holo',
  'Full Art':     'Full Art',
  'Alternate Art': 'Alternate Art',
};

// ─── Card (full model type) ───────────────────────────────────
export interface Card {
  id:         string;
  slug:       string;
  title:      string;
  game:       string;
  setName:    string;
  cardNumber: string;
  rarity:     string;
  finish:     string;
  condition:  string;
  language:   string;
  priceSar:   number;
  stockQty:   number;
  status:     CardStatus;
  imageUrl:   string;
  isFeatured: boolean;
  createdAt:  Date;
  updatedAt:  Date;
}

// ─── SystemConfig (key-value runtime toggles) ─────────────────
export interface SystemConfig {
  id:        string;
  key:       string;
  value:     string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Pricing helpers ─────────────────────────────────────────
export interface PriceBreakdown {
  basePrice:        number;
  toploaderFee:     number;
  vatAmount:        number;
  total:            number;
  vatEnabled:       boolean;
  toploaderEnabled: boolean;
}
