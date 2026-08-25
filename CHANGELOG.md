# CHANGELOG

All notable changes to the **Team HAT Cardhouse** (`store.team-hat.org`) project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.9.0] — 2026-08-25 · PROMPT-10: Showroom Details & Dynamic Wishlist

### Added
- **Showroom Details Route**: Built the `/vault/[id]` dynamic route allowing users to view high-resolution images and metadata for specific inventory items. Refactored `VaultCard.tsx` to link to this new route.
- **Dynamic Bounty Board**: Expanded the Prisma schema with a new `WishlistItem` model (pushed to production). 
- **Admin Wishlist Manager**: Created the `/admin/wishlist` CRUD interface with a slide-out editor and Cloudinary image upload for managing active bounties.
- **Live Wishlist Refactor**: Updated the public `/wishlist` page to fetch live database records instead of rendering static placeholders, removing hardcoded hex colors for dynamic theme mapping.

---

## [0.8.5] — 2026-08-25 · BUGFIX-09: Light Theme Contrast & Readability

### Fixed
- **Homepage Contrast**: Replaced hardcoded white and gray typography hex codes in `HeroSection.tsx` and `page.tsx` with dynamic CSS variables (`var(--text-primary)`, `var(--text-secondary)`, `var(--bg-elevated)`, etc.) to ensure complete readability across both light and dark modes.

---

## [0.8.4] — 2026-08-25 · BUGFIX-08: Vercel Build Script

### Fixed
- **Deployment Build Pipeline**: Updated the `"build"` script in `package.json` to `"prisma generate && next build"`. This explicitly generates the Prisma Client before compilation, bypassing Vercel's security block on the `postinstall` hook.

---

## [0.8.3] — 2026-08-25 · BUGFIX-07: Launcher & Lightbox Z-Index

### Fixed
- **Database Reset Bug**: Stripped `db:push` and `db:seed` logic from `launch_store.bat` to prevent the cloud Supabase database from being wiped on every dev server restart.
- **Lightbox Stacking Context**: Implemented React `createPortal` in `VaultCard.tsx` to mount the image lightbox directly to `document.body`, allowing it to break out of CSS `transform`/`overflow` constraints and render truly full-screen.

---

## [0.8.2] — 2026-08-25 · PROMPT-12: UX Polish

### Added
- **Image Lightbox**: Implemented a client-side full-screen image overlay on `VaultCard` to allow users to inspect high-resolution card details.

### Changed
- **Admin UI Labels**: Updated the display labels in the `CardEditorSheet` dropdown for `VAULT` (to "VAULT (Send to Showcase)") and `AVAILABLE` (to "AVAILABLE (For Sale)") to clarify business logic for operators.

---

### Fixed
- **Next.js Turbopack Cache**: Cleared the `.next` directory to purge the stale SQLite `PrismaClient` initialization errors.
- **Client Regeneration**: Regenerated the Prisma Client explicitly for PostgreSQL to ensure runtime compatibility.

---

## [0.8.0] — 2026-08-25 · PROMPT-08: Cloud Infrastructure Migration

### Added
- **Cloudinary Integration**: Installed `cloudinary` and replaced local file system image uploads with direct-to-cloud streams in the `/api/upload` route.
- **Environment Template**: Created `.env.example` detailing the required keys for PostgreSQL, Cloudinary, and the Admin PIN.
- **Image Optimization**: Whitelisted `res.cloudinary.com` in `next.config.ts`.

### Changed
- **Database Architecture**: Swapped Prisma provider from `"sqlite"` to `"postgresql"`.
- **Prisma Client**: Removed `@prisma/adapter-better-sqlite3` and reverted to standard database connection pooling in `src/lib/prisma.ts` and `prisma/seed.ts`.

### Removed
- Deleted local SQLite database (`dev.db`, `dev.db-journal`).
- Uninstalled `better-sqlite3` and `@prisma/adapter-better-sqlite3`.

---


## [0.7.0] — 2026-08-24 · PROMPT-07: The Communication Switchboard

### Added
- **Dynamic WhatsApp Routing**: Integrated the store's WhatsApp number into the `SystemConfig` model (`config_whatsapp`).
- **Store Contact Settings**: Expanded the `/admin/settings` dashboard to include a "Store Contact Details" section for updating the WhatsApp number.
- **Sanitized Checkout URLs**: Refactored the Cart Store's `buildWhatsAppUrl` generator to fetch the dynamic number and sanitize it (stripping spaces, dashes, etc.) to ensure valid `wa.me` links.

---


## [0.6.0] — 2026-08-24 · PROMPT-06: Dynamic System Settings & Wardrobe Migration

### Added
- **Dynamic Configuration Model**: Migrated `GAMES`, `CONDITIONS`, and `FINISHES` from hardcoded TypeScript enums to a database-driven `SystemConfig` JSON array model.
- **Admin Settings UI (`/admin/settings`)**: Built an interactive dashboard where admins can visually add and remove categories, rendering updates to the entire platform instantly.
- **Dynamic Forms**: Refactored `CardEditorSheet.tsx` to read its dropdown options dynamically from the database.

### Changed
- Seed script (`prisma/seed.ts`) now injects the initial array configurations for games, conditions, and finishes.
- Refactored `VaultGrid.tsx` to fallback to a generic `🃏` emoji for newly added dynamic games not found in the original dictionary.

---


## [0.4.3] — 2026-08-24 · BUGFIX-05: Responsive Polish & Admin Routing

### Fixed
- Extracted the Admin navigation into a new `<AdminSidebar />` Client Component to accurately reflect active routing states (`usePathname`).
- Removed excessive hardcoded vertical margins and heights from `/vault`, `/showcase`, `/wishlist`, and `/about` pages, closing the massive gaps between content blocks.
- Standardized the global layout containers using Tailwind (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full`) and grid constraints to ensure proper scaling on ultra-wide monitors.

---


## [0.4.2] — 2026-08-24 · BUGFIX-04: Global Spacing & Header Overlap

### Fixed
- Fixed layout overlap where the fixed `Header` collided with page content by adding global `pt-24 pb-12` spacing to the `<main>` tag in `src/app/layout.tsx`.

---


## [0.4.1] — 2026-08-24 · BUGFIX-03: Business Logic & Wishlist Crash

### Fixed
- Fixed `/vault` business logic by explicitly querying only `AVAILABLE` and `TRADE_ONLY` items, successfully hiding `VAULT` items from the main storefront.
- Fixed hydration and event handler boundary crashes on the `/wishlist` page by moving it to a Client Component (`"use client";`) and extracting its SEO metadata into a separate `layout.tsx`.

---


## [0.4.0] — 2026-08-24 · PROMPT-04: Frontend Completion

### Added
- **Showcase Page (`/showcase`)**: Added museum view fetching strictly `VAULT` status cards from Prisma.
- **Wishlist / Bounty Board (`/wishlist`)**: Built a static grid outlining KSA trade targets with an integrated WhatsApp CTA for users to propose trades.
- **About Page (`/about`)**: Created a trust-building page detailing the Team HAT mission and three core pillars (Local to KSA, 100% Verified, Community First).
- Integrated all new routes dynamically into the `Header` component.

---


## [0.3.2] — 2026-08-24 · BUGFIX-02: Next/Image Config & Hydration Completion

### Fixed
- Whitelisted image domains (`placehold.co`, `images.pokemontcg.io`, `en.onepiece-cardgame.com`, `sixfortyfive.com`) and enabled `dangerouslyAllowSVG` in `next.config.ts` to fix image rendering crashes.
- Completed Next.js hydration bugfix by adding `suppressHydrationWarning` to the `<body>` tag in `src/app/layout.tsx`.

---


## [0.3.1] — 2026-08-24 · BUGFIX-01: React Client Boundary Fixes

### Fixed
- Fixed Next.js hydration error caused by `next-themes` by adding `suppressHydrationWarning` to the root `<html>` tag in `src/app/layout.tsx`.
- Resolved `Event handlers cannot be passed to Client Component props` error by removing interactive `onMouseEnter` and `onMouseLeave` properties from server components (`src/app/admin/layout.tsx`).
- Added `"use client";` boundary directive to `src/app/page.tsx` since it utilizes interactive client-side hover states.

---


## [0.3.0] — 2026-08-24 · PROMPT-03: Admin Control Room & Inventory GUI

### Added
- **Admin Security (PIN Wall)**
  - Created `PinWall` client component (`src/components/admin/PinWall.tsx`)
  - Server-side layout protection in `src/app/admin/layout.tsx` using `next/headers` cookies
  - Auth API route `src/app/api/auth/pin/route.ts` validating against `ADMIN_PIN` in `.env.local`
- **Dashboard Overview (`/admin`)**
  - High-level KPIs driven by Prisma aggregations: Total Value, Total Listed, Available, Vaulted
- **Inventory Manager (`/admin/inventory`)**
  - Server page fetching all cards (including archived)
  - `InventoryDataTable` client component with fast client-side searching
  - Inline Action buttons (Edit, Delete)
- **Card Editor & Image Upload**
  - `CardEditorSheet` slide-out form for creating/updating cards
  - Enum integration for Game, Status, Condition, Finish, Language
  - Local Image Upload API (`src/app/api/upload/route.ts`) saving to `/public/uploads/cards/`
  - Complete REST CRUD API for cards (`src/app/api/cards/route.ts` & `[id]/route.ts`)

### Fixed
- Fixed CSS build error: Moved `@import url(...)` for Google Fonts to line 1 of `globals.css` above all other CSS rules.

---

## [0.2.0] — 2026-08-24 · PROMPT-02: Theme Engine, Vault Catalog, & WhatsApp Router

### Added
- **`next-themes` + `ThemeProvider`** (`src/components/ThemeProvider.tsx`)
  - Dual-theme system: Dark Mode (black `#000` / emerald green) and Light Mode (white `#fff` / emerald green)
  - `data-theme` attribute on `<html>` drives all CSS vars
  - Persistent theme preference via localStorage
- **`zustand` Trade Binder (Cart)** (`src/store/cartStore.ts`)
  - Global cart state with `persist` middleware (survives page refreshes)
  - `addItem`, `removeItem`, `clearCart`, `hasItem`, `totalSar`, `itemCount`
  - `buildWhatsAppUrl()` utility: formats full card list proposal message
- **`CartSheet`** slide-out binder panel (`src/components/CartSheet.tsx`)
  - Slide-in from right with backdrop blur
  - Card thumbnails, individual remove buttons, clear-all, empty state
  - WhatsApp proposal button with fully formatted `wa.me/966XXXXXXXXX` URL
  - Total SAR displayed prominently; mounted globally in root layout
- **`VaultCard`** component (`src/components/VaultCard.tsx`)
  - Card image with fallback game emoji, featured badge, vault overlay
  - Status badges: AVAILABLE (green), TRADE_ONLY (amber), VAULT (purple)
  - Condition / finish / language chip tags
  - Add-to-binder toggle button (tracks in-cart state)
- **`VaultGrid`** client filter component (`src/components/VaultGrid.tsx`)
  - Game filter tab bar with live counts per category
  - Animated active state pill; live result count with `aria-live`
  - Empty state with "show all" reset button
- **`/vault` page** (`src/app/vault/page.tsx`)
  - Server component — fetches all non-ARCHIVED cards from Prisma
  - Page header with breadcrumb, status summary chips, description
  - `force-dynamic` to ensure fresh DB reads per request

### Changed
- **`globals.css`** — Complete rewrite for dual-theme support
  - All surfaces/borders/text now use `--bg-*`, `--text-*`, `--border-*` CSS vars
  - Dark: `--bg-base: #000000`, Light: `--bg-base: #ffffff`
  - Added `slide-in-right`, `fade-in`, `cart-bounce` keyframes
  - Removed hardcoded `#020617` slate references from utility classes
- **`Header.tsx`** — Major update
  - **Logo**: Replaced ShoppingBag icon placeholder with `<Image src="/TeamHatHighRes2NoBG.png" />` (48×56)
  - **Theme Toggle**: Sun/Moon button using `useTheme` from next-themes
  - **Cart Button**: Shows cart count badge, opens slide-out binder
  - All inline colors replaced with CSS vars (`var(--nav-link)`, `var(--bg-elevated)`, etc.)
- **`layout.tsx`** — Added `ThemeProvider` wrapper and global `CartSheet` mount
- **`HeroSection.tsx`** — Background and stats bar now use `var(--bg-base)` and `var(--bg-card)` for theme compatibility

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
