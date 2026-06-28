"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-border bg-cream px-6 py-4 md:px-10">
      {/*
        Confirmed from Dev Mode: this row is Flow: Horizontal,
        Width: Hug 360px, Height: Hug 44px, Gap: 40px between the logo
        and the "Find a doula" link.
      */}
      <div className="flex h-11 items-center gap-10">
        <Link href="/" className="relative block h-6 w-20" aria-label="Aunti home">
          {/* Real exported wordmark, not styled text */}
          <Image src="/assets/icons/logo.svg" alt="Aunti" fill priority />
        </Link>
        <Link
          href="/directory"
          className="text-sm font-medium text-ink hover:text-orange transition-colors"
        >
          Find a doula
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/*
          Confirmed from Dev Mode: Button Group > Button — 227 Hug x 44,
          Variant: Primary, Background: On-primary, Icon Start: heart,
          Has Icon End: false.
        */}
        <Link
          href="/list-your-services"
          className="hidden h-11 items-center gap-2 rounded-md bg-navy px-5 text-sm font-medium text-white transition-colors hover:bg-navy-soft sm:inline-flex"
        >
          <Image src="/assets/icons/heart.svg" alt="" width={16} height={16} aria-hidden />
          List your doula services
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-ink hover:bg-black/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-border bg-white py-2 shadow-lg"
            >
              <Link
                href="/faqs"
                role="menuitem"
                className="block px-4 py-2 text-sm text-ink hover:bg-black/[0.03]"
              >
                FAQs
              </Link>
              <Link
                href="/sign-in"
                role="menuitem"
                className="block px-4 py-2 text-sm text-ink hover:bg-black/[0.03]"
              >
                Doula sign in
              </Link>
              <Link
                href="/sign-up"
                role="menuitem"
                className="block px-4 py-2 text-sm text-ink hover:bg-black/[0.03]"
              >
                Doula sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
