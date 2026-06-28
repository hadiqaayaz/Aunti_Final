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
https://github.com/hadiqaayaz/Aunti_Final

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

I used app/directory/page.tsx as a Server Component that reads searchParams and passes the initial filter values to DirectoryPageClient. This ensures the first page load is server-rendered with the correct filters already applied, which improves SEO and avoids showing incorrect results before the page updates.

After the initial render, filter changes are handled on the client using useState, which fetches updated listings from /api/listings without reloading the page. This keeps filter interactions fast and the implementation simple.

The tradeoff is that the URL does not update when filters change, so users cannot share or bookmark the current filtered state after interacting with the page. I chose this approach because it avoids the added complexity and unnecessary requests that can occur when updating the URL on every filter change.
