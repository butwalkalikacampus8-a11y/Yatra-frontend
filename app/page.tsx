import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/hero/HeroSection'
import { ScrollTicker } from '@/components/ui/ScrollTicker'
import { LiveBudgetFeed } from '@/components/feed/LiveBudgetFeed'
import { FeaturesGrid } from '@/components/sections/FeaturesGrid'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-hidden">
        {/* Fixed background layers */}
        <div className="bg-grid fixed inset-0 z-0 pointer-events-none" />
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,102,255,0.12),transparent)]" />

        <HeroSection />
        <ScrollTicker />

        <section className="relative z-10 max-w-[1200px] mx-auto px-8 py-24">
          <div className="mb-10">
            <p className="font-mono-custom text-[11px] tracking-[0.15em] text-[#00C2FF] uppercase mb-2">
              // Live Budget Feed
            </p>
            <h2 className="font-display text-4xl font-bold">
              Ministry Expenditure Ledger
            </h2>
          </div>
          <LiveBudgetFeed />
        </section>

        <section className="relative z-10 max-w-[1200px] mx-auto px-8 py-12">
          <p className="font-mono-custom text-[11px] tracking-[0.15em] text-[#00C2FF] uppercase mb-2">
            // Why Drishti
          </p>
          <h2 className="font-display text-4xl font-bold mb-10">
            The Protocol Architecture
          </h2>
          <FeaturesGrid />
        </section>
      </main>
      <Footer />
    </>
  )
}