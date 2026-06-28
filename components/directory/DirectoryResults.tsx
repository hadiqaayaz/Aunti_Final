"use client";

import { useState, useEffect, useCallback } from "react";
import { ListingCard } from "@/components/listing/ListingCard";
import type { Doula, DoulaSpecialty } from "@/lib/types";

interface DirectoryResultsProps {
  zipCode: string;
  specialties: DoulaSpecialty[];
  date: string;
  maxPackagePrice: number;
  maxAddonRate: number;
  tags: string[];
}

type SortOption = "best-match" | "price-asc" | "price-desc";

export function DirectoryResults({ zipCode, specialties, date, maxPackagePrice, maxAddonRate, tags }: DirectoryResultsProps) {
  const [doulas, setDoulas] = useState<Doula[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("best-match");

  const fetchDoulas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (zipCode) params.set("zipCode", zipCode);
      if (specialties.length > 0) params.set("specialties", specialties.join(","));
      if (date) params.set("date", date);
      if (maxPackagePrice < 3000) params.set("maxPackagePrice", String(maxPackagePrice));
      if (maxAddonRate < 150) params.set("maxAddonRate", String(maxAddonRate));
      if (tags.length > 0) params.set("tags", tags.join(","));

      const res = await fetch(`/api/listings?${params.toString()}`);
      if (!res.ok) throw new Error("Server error");
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "Unknown error");
      setDoulas(json.data.results);
      setTotal(json.data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load results.");
    } finally {
      setLoading(false);
    }
  }, [zipCode, specialties, date, maxPackagePrice, maxAddonRate, tags]);

  useEffect(() => {
    fetchDoulas();
  }, [fetchDoulas]);

  const sorted = [...doulas].sort((a, b) => {
    if (sort === "price-asc") return a.packagePrice - b.packagePrice;
    if (sort === "price-desc") return b.packagePrice - a.packagePrice;
    return 0;
  });

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between mb-1">
          <div className="h-5 w-40 animate-pulse rounded-md bg-[#E1DCD9]" />
          <div className="h-9 w-32 animate-pulse rounded-md bg-[#E1DCD9]" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[152px] animate-pulse rounded-2xl bg-[#E1DCD9]" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8552e]/10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke="#e8552e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-base font-medium text-[#1a1a1a]">Something went wrong</p>
          <p className="mt-1 text-sm text-[#6b6660]">{error}</p>
        </div>
        <button
          onClick={fetchDoulas}
          className="rounded-md bg-[#1a1f2e] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#232838] transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E1DCD9] bg-[#fbf6f3]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#6b6660" strokeWidth="1.5" />
            <path d="m21 21-4.35-4.35" stroke="#6b6660" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-base font-medium text-[#1a1a1a]">No doulas found</p>
          <p className="mt-1 text-sm text-[#6b6660]">
            Try adjusting your filters or search a different ZIP code.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center justify-between">
        <p style={{ fontFamily: "Figtree, system-ui, sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "#1a1a1a" }}>
          {total} matching doula{total !== 1 ? "s" : ""}
        </p>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-9 appearance-none rounded-md border border-[#E1DCD9] bg-white pl-3 pr-8 text-sm text-[#1a1a1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8552e] cursor-pointer"
          >
            <option value="best-match">Best match</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b6660]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {sorted.map((doula) => (
          <ListingCard key={doula.id} doula={doula} />
        ))}
      </div>
    </div>
  );
}