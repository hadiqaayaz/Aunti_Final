"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface HowItWorksItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

const ITEMS: HowItWorksItem[] = [
  {
    id: "search",
    title: "Search based on your needs",
    description:
      "Tell us your due date, location, and what kind of support you need—birth, postpartum, or both.",
  },
  {
    id: "explore",
    title: "Explore doulas near you",
    description:
      "Browse detailed profiles, compare experience, availability, pricing, and specialties. Filter by what matters most to you—like specialties, cultural identity, or languages spoken.",
  },
  {
    id: "connect",
    title: "Reach out and connect",
    description:
      "Message doulas directly to ask questions and see if they're the right fit for your family.",
  },
  {
    id: "book",
    title: "Book confidently",
    description:
      "Secure your doula's support with a clear agreement and transparent pricing.",
    badge: "Coming soon",
  },
  {
    id: "support",
    title: "Feel supported, at every step",
    description:
      "From early pregnancy through postpartum, your doula is there for the moments that matter.",
  },
];

export function HowItWorks() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section className="bg-navy px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[280px_1fr] md:gap-16">
        {/* Sidebar */}
        <div>
          {/* Group 19 illustration */}
          <div className="mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icons/group-19.svg"
              alt=""
              aria-hidden
              width={64}
              height={48}
            />
          </div>
          <h2 className="font-display text-3xl font-semibold text-white">How it works</h2>
          <Button
            variant="outline"
            className="mt-5 w-auto border-white/30 text-white hover:bg-white/10"
          >
            See more FAQs →
          </Button>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-white/10 border-t border-white/10">
          {ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-white"
                >
                  <span className="text-base font-medium">{item.title}</span>
                  <span className="flex items-center gap-3 shrink-0">
                    {item.badge && (
                      <span className="rounded-full bg-orange px-2.5 py-1 text-xs font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 pr-10 text-sm leading-relaxed text-white/70">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
