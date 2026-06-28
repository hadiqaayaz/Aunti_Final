"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import type { DoulaSpecialty } from "@/lib/types";

const SPECIALTY_OPTIONS: { value: DoulaSpecialty; label: string }[] = [
  { value: "birth", label: "Birth" },
  { value: "postpartum", label: "Postpartum" },
  { value: "full-spectrum", label: "Full Spectrum" },
];

export function HeroFilterCard() {
  const router = useRouter();
  const [zipCode, setZipCode] = useState("");
  const [specialties, setSpecialties] = useState<DoulaSpecialty[]>([]);
  const [date, setDate] = useState("");

  function toggleSpecialty(value: DoulaSpecialty) {
    setSpecialties((current) =>
      current.includes(value)
        ? current.filter((s) => s !== value)
        : [...current, value]
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (zipCode) params.set("zipCode", zipCode);
    if (specialties.length > 0) params.set("specialties", specialties.join(","));
    if (date) params.set("date", date);
    router.push(`/directory?${params.toString()}`);
  }

  function handleReset() {
    setZipCode("");
    setSpecialties([]);
    setDate("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-full max-w-[582px] rounded-2xl border border-border bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
    >
      <h1 className="font-display text-[32px] font-normal leading-[40px] tracking-normal text-ink">
        Find a doula that feels like home
      </h1>
      <p className="mt-2 text-sm text-muted">Search our doula directory now</p>

      <div className="mt-6">
        <label htmlFor="zipCode" className="mb-1.5 block text-sm font-medium text-ink">
          Zip code
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <input
            id="zipCode"
            type="text"
            inputMode="numeric"
            placeholder="55555"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="h-10 w-full rounded-md border border-border bg-white pl-9 pr-3 text-sm text-ink placeholder:text-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-medium text-ink">
          What type of doula are you looking for?
        </legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {SPECIALTY_OPTIONS.map((option) => (
            <Checkbox
              key={option.value}
              id={option.value}
              label={option.label}
              checked={specialties.includes(option.value)}
              onChange={() => toggleSpecialty(option.value)}
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="dueDate" className="mb-1.5 block text-sm font-medium text-ink">
          Expected due date (or baby&apos;s birth date)
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>

          {/*
            Native <input type="date"> always renders its own locale
            placeholder (e.g. "dd/mm/yyyy") that can't be reliably hidden
            with CSS across browsers. Layering a custom "Select date" span
            on top of that caused the two placeholders to visually overlap.
            Fix: keep the real <input type="date"> for actual functionality
            and accessibility, but make its own text transparent and draw
            our single styled label on top instead, so only one placeholder
            is ever visible.
          */}
          <input
            id="dueDate"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 w-full rounded-md border border-border bg-white pl-9 pr-3 text-sm text-transparent caret-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-datetime-edit]:text-transparent"
          />
          <span className="pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 text-sm text-ink">
            {date
              ? new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : <span className="text-muted/70">Select date</span>}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        <Button type="submit" variant="primary">
          Search
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset filters
        </Button>
      </div>
    </form>
  );
}
