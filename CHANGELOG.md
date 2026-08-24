# CHANGELOG

All notable changes to the **Team HAT Cardhouse** (`store.team-hat.org`) project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.1.0] — 2026-08-24 · PROMPT-01: Project Initialization & Core Architecture

### Added
- **Next.js 14+ (App Router)** scaffold with TypeScript, Tailwind CSS v4, and ESLint
- **Prisma ORM + SQLite** setup (`prisma/schema.prisma`)
  - `Card` model with all required fields: `id`, `slug`, `title`, `game`, `setName`, `cardNumber`, `rarity`, `finish`, `condition`, `language`, `priceSar`, `stockQty`, `status`, `imageUrl`, `isFeatured`, `createdAt`, `updatedAt`
  - `User` model (future auth/referral hooks): `id`, `email`, `name`, `referralCode`, `discountPercent`
  - `SystemConfig` model (key-value runtime toggles for VAT, packaging, referrals)
  - All enum-like fields implemented as **String with TypeScript union types** (SQLite compatibility)
- **TypeScript Types** (`src/types/card.ts`)
  - `Game`, `CardStatus`, `Condition`, `Language`, `Finish` union types with `as const` arrays
  - Label maps (`GAME_LABELS`, `STATUS_LABELS`, `CONDITION_LABELS`, `FINISH_LABELS`)
  - Status color maps (`STATUS_COLORS`) for UI badges
  - Full `Card` and `SystemConfig` interfaces
  - `PriceBreakdown` interface for future VAT/packaging engine
- **Prisma Singleton Client** (`lib/prisma.ts`) — hot-reload safe for Next.js dev
- **Seed Script** (`prisma/seed.ts`) — 6 realistic sample items:
  1. Charizard ex [Pokémon, AVAILABLE, SAR 180]
  2. Monkey D. Luffy Manga Rare [One Piece, VAULT, SAR 350]
  3. Elsa — Spirit of Winter Enchanted [Lorcana, TRADE_ONLY, SAR 420]
  4. Erling Haaland Gold Shimmer [Topps, AVAILABLE, SAR 95]
  5. Riftbound Starter Deck — Noxus [Riftbound, AVAILABLE, SAR 65]
  6. Team HAT Snapback Cap [Merch, AVAILABLE, SAR 120]
- **SystemConfig seeds**: `vat_enabled=false`, `vat_rate=0.15`, `toploader_upgrade=true`, `toploader_fee_sar=2.00`, `referral_enabled=false`, `referral_discount=0.10`
- **package.json** scripts: `db:push`, `db:seed`, `db:studio`, `db:reset`
- **Seed runner** configured via `"prisma": { "seed": "tsx prisma/seed.ts" }` per Windows compatibility requirement
- **Global CSS design system** (`src/app/globals.css`)
  - Team HAT brand tokens: emerald greens (`#022c22` → `#10b981`), slate darks (`#020617` → `#f1f5f9`), gold accents (`#f59e0b` → `#fcd34d`)
  - Tailwind v4 `@theme inline` extensions
  - Utility classes: `.glass-card`, `.glow-green`, `.glow-gold`, `.gradient-text-green`, `.gradient-text-gold`, `.border-gradient`, `.card-hover`, `.shine-on-hover`, `.status-badge`, `.nav-link`, `.btn-primary`, `.btn-secondary`
  - Keyframe animations: `shine-sweep`, `pulse-ring`, `float`
  - Google Fonts: Inter + Space Grotesk via CSS import
- **Header component** (`src/components/Header.tsx`)
  - Sticky glassmorphism navbar with scroll-aware background
  - Desktop nav: Trade Vault, Showcase, Wishlist, About + Browse Cards CTA
  - Mobile responsive hamburger menu with smooth accordion dropdown
  - Animated nav link underlines with green-to-gold gradient
- **HeroSection component** (`src/components/HeroSection.tsx`)
  - Full-viewport hero with radial gradient background + grid overlay
  - Floating card silhouettes with CSS `float` animation
  - Gradient headline: "Team HAT Card Vault" (green + gold)
  - Live badge with pulse animation
  - Game category pills for all 6 supported TCG categories
  - Stats bar: 500+ Cards, 6 Collections, 100% NM Verified, SAR pricing
  - Primary + secondary CTA buttons
- **Home page** (`src/app/page.tsx`)
  - HeroSection + 3-card feature grid (Trade Vault, Showcase, Wishlist)
  - Bottom CTA banner with gradient glow
- **Root layout** (`src/app/layout.tsx`)
  - Full SEO metadata: title template, description, keywords, OpenGraph, Twitter cards
  - Google Fonts preconnect links
  - Semantic HTML: `<header>`, `<main id="main-content">`, `<footer>`
- **`.gitignore`** — Next.js defaults + SQLite db files, `.env*`
- **`CHANGELOG.md`** — this file
- **`launch_store.bat`** — Windows 1-click dev server launcher for Chloe
- **Git repository** — initialized with initial commit

### Architecture Notes
- All String-typed Prisma fields are validated at the TypeScript layer via `src/types/card.ts` union types
- `SystemConfig` records are the activation switch for VAT engine, toploader upgrade, and referral system — no code changes needed to enable them later
- Database portable to PostgreSQL/Supabase by changing `DATABASE_URL` and `provider` in `schema.prisma`
