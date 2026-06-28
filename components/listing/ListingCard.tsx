"use client";

import Link from "next/link";
import { useState } from "react";
import type { Doula } from "@/lib/types";

interface ListingCardProps {
  doula: Doula;
}

export function ListingCard({ doula }: ListingCardProps) {
  const [imgError, setImgError] = useState(false);
  const initials = doula.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const visibleTags = doula.tags.slice(0, 4);
  const extraCount = doula.tags.length - visibleTags.length;

  return (
    <article className="flex gap-4 rounded-2xl border border-[#E1DCD9] bg-white p-4 hover:shadow-sm transition-shadow">

      {/* ── Photo — 176×196, rounded-xl ── */}
      <div
        className="relative shrink-0 overflow-hidden rounded-xl bg-[#EDE8E4]"
        style={{ width: 176, height: 196 }}
      >
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={doula.photoUrl}
            alt={doula.name}
            className="h-full w-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-[#6b6660]">
            {initials}
          </span>
        )}
      </div>

      {/* ── Centre column ── */}
      <div className="flex flex-1 min-w-0 flex-col justify-center gap-2 py-1">

        {/* Name + badge */}
        <div className="flex flex-wrap items-center gap-2">
          <h3
            style={{
              fontFamily: "var(--font-display, 'Literata', Georgia, serif)",
              fontWeight: 400,
              fontSize: 28,
              lineHeight: "36px",
              letterSpacing: 0,
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            {doula.name}
          </h3>

          {doula.isNew ? (
            /* "New to Aunti" — bg #FDEFEA, border Orange-200 (#F5B8A0 approx), radius 36px, padding 4px 8px, gap 6px */
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#FDEFEA",
                border: "1px solid #F5B8A0",
                borderRadius: 36,
                padding: "4px 8px",
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "var(--font-sans, 'Figtree', sans-serif)",
                color: "#e8552e",
                whiteSpace: "nowrap",
                gap: 6,
              }}
            >
              New to Aunti
            </span>
          ) : (
            /* Verified gold badge */
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Verified" style={{ flexShrink: 0 }}>
              <circle cx="10" cy="10" r="10" fill="#F4A81F" />
              <path d="M5.5 10l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Location | pronouns | testimonials
            Testimonials: #1F56A8 (blue), title/small Figtree 600 SemiBold 14px / 20px lh */}
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
          <span style={{ fontFamily: "var(--font-sans, 'Figtree', sans-serif)", fontSize: 16, color: "#6b6660", fontWeight: 400 }}>
            {doula.city}, {doula.state}
          </span>
          <span style={{ color: "#6b6660", fontSize: 16 }}>|</span>
          <span style={{ fontFamily: "var(--font-sans, 'Figtree', sans-serif)", fontSize: 16, color: "#6b6660", fontWeight: 400 }}>
            {doula.pronouns}
          </span>
          <span style={{ color: "#6b6660", fontSize: 16 }}>|</span>
          {/* title/small — Figtree 600 SemiBold 14px, color #1F56A8 */}
          <Link
            href="#"
            style={{
              fontFamily: "var(--font-sans, 'Figtree', sans-serif)",
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "20px",
              color: "#1F56A8",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            className="hover:underline"
          >
            {doula.testimonialCount} Testimonials
          </Link>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              style={{
                borderRadius: 4,
                border: "1px solid #E1DCD9",
                background: "#FBF6F3",
                padding: "4px 10px",
                fontSize: 13,
                color: "#1a1a1a",
                fontFamily: "var(--font-sans, 'Figtree', sans-serif)",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </span>
          ))}
          {extraCount > 0 && (
            <span
              style={{
                borderRadius: 4,
                border: "1px solid #E1DCD9",
                background: "#FBF6F3",
                padding: "4px 10px",
                fontSize: 13,
                color: "#6b6660",
                fontFamily: "var(--font-sans, 'Figtree', sans-serif)",
                whiteSpace: "nowrap",
              }}
            >
              {extraCount} more...
            </span>
          )}
        </div>

        {/* View profile — title/medium Figtree 600 SemiBold 16px/24px, color #1F56A8, 89×24 hug */}
        <Link
          href={`/directory/${doula.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            width: "fit-content",
            height: 24,
            fontFamily: "var(--font-sans, 'Figtree', sans-serif)",
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: 0,
            color: "#1F56A8",
            textDecoration: "none",
          }}
          className="hover:underline"
        >
          View profile →
        </Link>
      </div>

      {/* ── Pricing panel — 136px wide, full card height ── */}
      <div
        className="hidden shrink-0 md:flex flex-col rounded-[4px] border border-[#E1DCD9]"
        style={{ width: 136, alignSelf: "stretch", padding: 12, gap: 6 }}
      >
        {/* "Packages start at" — label/small Figtree 600 SemiBold 11px/16px, color #066F55 (emerald) */}
        <div style={{ borderBottom: "1px solid #E1DCD9", paddingBottom: 8, marginBottom: 4 }}>
          <p style={{
            fontFamily: "var(--font-sans, 'Figtree', sans-serif)",
            fontWeight: 600,
            fontSize: 11,
            lineHeight: "16px",
            letterSpacing: 0,
            color: "#066F55",
            margin: 0,
          }}>
            Packages start at
          </p>
          <p style={{
            fontFamily: "var(--font-sans, 'Figtree', sans-serif)",
            fontWeight: 700,
            fontSize: 18,
            lineHeight: "24px",
            color: "#1a1a1a",
            margin: 0,
          }}>
            ${doula.packagePrice.toLocaleString()}
          </p>
        </div>

        {/* "Add-on services start at" — same label/small style, color #066F55 */}
        <div style={{ marginBottom: 4 }}>
          <p style={{
            fontFamily: "var(--font-sans, 'Figtree', sans-serif)",
            fontWeight: 600,
            fontSize: 11,
            lineHeight: "15px",
            color: "#066F55",
            margin: 0,
          }}>
            Add-on services start at
          </p>
          <p style={{
            fontFamily: "var(--font-sans, 'Figtree', sans-serif)",
            fontWeight: 700,
            fontSize: 14,
            lineHeight: "20px",
            color: "#1a1a1a",
            margin: 0,
          }}>
            ${doula.addonRate}/hr
          </p>
        </div>

        {/* Sliding scale + payment plans */}
        <div className="mt-auto flex flex-col gap-1">
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#6b6660" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M2 2l6 6M8 2l-6 6" stroke="#6b6660" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Sliding scale
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: doula.paymentPlans ? "#1a1a1a" : "#6b6660" }}>
            {doula.paymentPlans ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M1.5 5l2.5 2.5L8.5 2" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M2 2l6 6M8 2l-6 6" stroke="#6b6660" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            Payment plans
          </span>
        </div>
      </div>
    </article>
  );
}
