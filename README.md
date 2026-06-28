# Aunti — Doula Directory

A pixel-perfect, fully functional directory for finding doulas. Built with Next.js 16 App Router + TypeScript + Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev
```
Live Demo
https://aunti-final.vercel.app/
GitHub Repository
https://github.com/hadiqaayaz/Aunti_Fina
host: [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
app/
  api/listings/route.ts   # GET handler — filters mock data, returns typed ApiResponse<ListingsResponse>
  directory/page.tsx      # Server component — reads searchParams, renders DirectoryPageClient
  page.tsx                # Landing page
  layout.tsx              # Root layout, Literata font

components/
  directory/
    DirectoryPage.tsx     # Client wrapper that owns filter state
    DirectoryFilters.tsx  # Sidebar filters (ZIP, specialty, date, price sliders)
    DirectoryResults.tsx  # Fetches /api/listings, renders loading/error/empty/results states
  filters/
    HeroFilterCard.tsx    # Landing page filter card
  layout/
    Header.tsx            # Nav + hamburger menu
    Footer.tsx
    HeroBlobs.tsx         # Decorative SVG blob illustration
    HowItWorks.tsx        # Accordion section
  listing/
    ListingCard.tsx       # Individual doula card
  ui/
    Button.tsx
    Checkbox.tsx          # Custom orange checked state

lib/
  mock-data.ts            # Imported ONLY by api/listings/route.ts
  types.ts                # Shared domain types

public/assets/
  blobs/                  # Hero SVG blobs
  icons/                  # logo.svg, heart.svg, group-19.svg
  doulas/                 # Placeholder for doula photos
```

## Tradeoff: Server Component for Directory Page vs. Full Client

The `app/directory/page.tsx` is a **server component** that reads `searchParams` at request time and passes initial filter values to the `DirectoryPageClient` component. This means the first render is SSR with the correct filters already applied — no flash of wrong state, and search-engine crawlers see real content.

The tradeoff: filter interactions after the initial load are handled client-side via `useState` in `DirectoryPageClient`, which re-fetches from `/api/listings` on change. This means the URL doesn't update as users adjust filters in the sidebar (unlike a fully URL-driven approach with `router.push`). The choice prioritises simplicity and avoids double-fetching on every keystroke, at the cost of shareable filter URLs after interaction.
