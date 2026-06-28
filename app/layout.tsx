import type { Metadata } from "next";
import { Literata, Figtree } from "next/font/google";
import "./globals.css";

/**
 * Typography from Figma Dev Mode:
 *   headline/medium = Literata, 400 weight, 28px, 36px lh
 *   body/large = Figtree, 400 weight, 16px, 24px lh
 *   title/small = Figtree, (testimonial link)
 *   label/small = Figtree, 600 SemiBold, 11px (pricing labels)
 *   title/large = Figtree, 600 SemiBold, 18px (price value)
 */
const literata = Literata({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aunti — Find a doula that feels like home",
  description:
    "Search Aunti's doula directory to find birth, postpartum, and full-spectrum doulas near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${literata.variable} ${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
