"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DirectoryFilters } from "@/components/directory/DirectoryFilters";
import { DirectoryResults } from "@/components/directory/DirectoryResults";
import type { DoulaSpecialty } from "@/lib/types";

interface DirectoryPageProps {
  initialZipCode: string;
  initialSpecialties: DoulaSpecialty[];
  initialDate: string;
}

export function DirectoryPageClient({
  initialZipCode,
  initialSpecialties,
  initialDate,
}: DirectoryPageProps) {
  const [filters, setFilters] = useState({
    zipCode: initialZipCode,
    specialties: initialSpecialties,
    date: initialDate,
    maxPackagePrice: 3000,
    maxAddonRate: 150,
    tags: [] as string[],
  });

  const handleFilter = useCallback(
    (params: {
      zipCode: string;
      specialties: DoulaSpecialty[];
      date: string;
      maxPackagePrice: number;
      maxAddonRate: number;
      tags: string[];
    }) => {
      setFilters(params);
    },
    []
  );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 px-6 py-8 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="sr-only">Directory</h1>
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="md:sticky md:top-6 md:self-start">
              <DirectoryFilters
                initialZipCode={filters.zipCode}
                initialSpecialties={filters.specialties}
                initialDate={filters.date}
                onFilter={handleFilter}
              />
            </div>
            <DirectoryResults
              zipCode={filters.zipCode}
              specialties={filters.specialties}
              date={filters.date}
              maxPackagePrice={filters.maxPackagePrice}
              maxAddonRate={filters.maxAddonRate}
              tags={filters.tags}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}