import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">About Aunti</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/about" className="hover:text-orange transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Need help?</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/faqs" className="hover:text-orange transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          {/* Real exported wordmark, sized to the same confirmed
              header dimensions (80x24) — footer-specific sizing
              hasn't been confirmed separately in Dev Mode. */}
          <div className="relative h-6 w-20">
            <Image src="/assets/icons/logo.svg" alt="Aunti" fill />
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Aunti on Instagram"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-ink hover:bg-black/[0.03]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
