import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HowItWorks } from "@/components/layout/HowItWorks";
import { HeroBlobs } from "@/components/layout/HeroBlobs";
import { HeroFilterCard } from "@/components/filters/HeroFilterCard";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden px-6 py-14 md:px-10 md:py-20">
          <HeroBlobs />
          <div className="relative z-10 mx-auto max-w-6xl">
            <HeroFilterCard />
          </div>
        </section>

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
