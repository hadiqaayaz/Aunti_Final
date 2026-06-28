"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import type { DoulaSpecialty } from "@/lib/types";

interface DirectoryFiltersProps {
  initialZipCode: string;
  initialSpecialties: DoulaSpecialty[];
  initialDate: string;
  onFilter: (params: {
    zipCode: string;
    specialties: DoulaSpecialty[];
    date: string;
    maxPackagePrice: number;
    maxAddonRate: number;
    tags: string[];
  }) => void;
}

const SPECIALTY_OPTIONS: { value: DoulaSpecialty; label: string }[] = [
  { value: "birth", label: "Birth Doula" },
  { value: "postpartum", label: "Postpartum Doula" },
  { value: "full-spectrum", label: "Full Spectrum Doula" },
];

const TAG_SECTIONS: { label: string; tags: string[] }[] = [
  {
    label: "Type of care offered",
    tags: ["Birth Doula", "Postpartum Doula", "Full Spectrum Doula"],
  },
  {
    label: "Certification",
    tags: ["Evidence-based"],
  },
  {
    label: "Inclusive care",
    tags: ["LGBTQ+ clients", "BIPOC families", "Cultural sensitivity"],
  },
  {
    label: "Special circumstances",
    tags: ["Trauma-informed", "Midwifery background"],
  },
  {
    label: "Support type",
    tags: ["Overnight support", "Newborn care", "Lactation support", "Meal planning"],
  },
  {
    label: "Languages spoken",
    tags: ["Bilingual (Spanish)", "Bilingual (Japanese)"],
  },
];

export function DirectoryFilters({
  initialZipCode,
  initialSpecialties,
  initialDate,
  onFilter,
}: DirectoryFiltersProps) {
  const [zipCode, setZipCode] = useState(initialZipCode);
  const [specialties, setSpecialties] = useState<DoulaSpecialty[]>(initialSpecialties);
  const [date, setDate] = useState(initialDate);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [birthMax, setBirthMax] = useState(3000);
  const [ppMax, setPpMax] = useState(150);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  function emit(overrides: Partial<{
    zipCode: string;
    specialties: DoulaSpecialty[];
    date: string;
    maxPackagePrice: number;
    maxAddonRate: number;
    tags: string[];
  }> = {}) {
    onFilter({
      zipCode,
      specialties,
      date,
      maxPackagePrice: birthMax,
      maxAddonRate: ppMax,
      tags: activeTags,
      ...overrides,
    });
  }

  function toggleSpecialty(value: DoulaSpecialty) {
    const next = specialties.includes(value)
      ? specialties.filter((s) => s !== value)
      : [...specialties, value];
    setSpecialties(next);
    emit({ specialties: next });
  }

  function toggleTag(tag: string) {
    const next = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag];
    setActiveTags(next);
    emit({ tags: next });
  }

  function handleZipBlur() {
    emit();
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
    emit({ date: e.target.value });
  }

  function handleReset() {
    setZipCode("");
    setSpecialties([]);
    setDate("");
    setBirthMax(3000);
    setPpMax(150);
    setActiveTags([]);
    onFilter({ zipCode: "", specialties: [], date: "", maxPackagePrice: 3000, maxAddonRate: 150, tags: [] });
  }

  function toggleSection(s: string) {
    setOpenSections((cur) =>
      cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]
    );
  }

  return (
    <aside className="w-full shrink-0 rounded-2xl border border-[#E1DCD9] bg-white px-6 py-5 md:w-[240px]">
      <h2 className="font-display text-2xl font-normal text-[#1a1a1a] mb-4">Find a doula</h2>

      {/* ZIP */}
      <div className="mb-4">
        <label htmlFor="dir-zip" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
          ZIP code
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6660]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <input
            id="dir-zip"
            type="text"
            inputMode="numeric"
            placeholder="Enter ZIP code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            onBlur={handleZipBlur}
            className="h-10 w-full rounded-md border border-[#E1DCD9] bg-white pl-9 pr-3 text-sm text-[#1a1a1a] placeholder:text-[#6b6660]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8552e]"
          />
        </div>
      </div>

      {/* Specialty */}
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-[#1a1a1a]">Specialty</p>
        <div className="flex flex-col gap-2">
          {SPECIALTY_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.value}
              id={`dir-${opt.value}`}
              label={opt.label}
              checked={specialties.includes(opt.value)}
              onChange={() => toggleSpecialty(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Due date */}
      <div className="mb-4">
        <label htmlFor="dir-date" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
          Expected due date (or baby&apos;s birth date)
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6660]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <input
            id="dir-date"
            type="date"
            value={date}
            onChange={handleDateChange}
            className="h-10 w-full rounded-md border border-[#E1DCD9] bg-white pl-9 pr-3 text-sm text-[#1a1a1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8552e] [&::-webkit-calendar-picker-indicator]:opacity-50"
          />
        </div>
      </div>

      {/* Birth Support slider */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-[#1a1a1a]">Birth Support (total fee)</p>
          <p className="text-xs text-[#6b6660]">$0–${birthMax}</p>
        </div>
        <div className="relative h-1.5 rounded-full bg-[#E1DCD9] mt-2 mb-4">
          <div
            className="absolute h-1.5 rounded-full bg-[#e8552e]"
            style={{ left: 0, right: `${100 - (birthMax / 3000) * 100}%` }}
          />
          <input
            type="range" min={0} max={3000} step={50} value={birthMax}
            onChange={(e) => {
              const val = +e.target.value;
              setBirthMax(val);
              emit({ maxPackagePrice: val });
            }}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
          />
          <div
            className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-[#e8552e] bg-white shadow pointer-events-none"
            style={{ left: `calc(${(birthMax / 3000) * 100}% - 7px)` }}
          />
        </div>
      </div>

      {/* Postpartum slider */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-[#1a1a1a]">Postpartum Support (hourly rate)</p>
          <p className="text-xs text-[#6b6660]">$0–${ppMax}/hr</p>
        </div>
        <div className="relative h-1.5 rounded-full bg-[#E1DCD9] mt-2 mb-4">
          <div
            className="absolute h-1.5 rounded-full bg-[#e8552e]"
            style={{ left: 0, right: `${100 - (ppMax / 150) * 100}%` }}
          />
          <input
            type="range" min={0} max={150} step={5} value={ppMax}
            onChange={(e) => {
              const val = +e.target.value;
              setPpMax(val);
              emit({ maxAddonRate: val });
            }}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
          />
          <div
            className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-[#e8552e] bg-white shadow pointer-events-none"
            style={{ left: `calc(${(ppMax / 150) * 100}% - 7px)` }}
          />
        </div>
      </div>

      {/* Tag filter sections */}
      <div className="border-t border-[#E1DCD9] pt-4">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-sm font-medium text-[#1a1a1a]">Filters</p>
          <button
            onClick={handleReset}
            className="text-xs font-medium text-[#e8552e] hover:underline"
          >
            Reset filters
          </button>
        </div>
        {TAG_SECTIONS.map((section) => (
          <div key={section.label}>
            <button
              onClick={() => toggleSection(section.label)}
              className="flex w-full items-center gap-2 py-2.5 text-sm text-[#1a1a1a] hover:text-[#e8552e] transition-colors"
            >
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                className={`shrink-0 transition-transform ${openSections.includes(section.label) ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {section.label}
            </button>
            {openSections.includes(section.label) && (
              <div className="flex flex-col gap-2 pb-2 pl-4">
                {section.tags.map((tag) => (
                  <Checkbox
                    key={tag}
                    id={`tag-${tag}`}
                    label={tag}
                    checked={activeTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}