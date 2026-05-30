import Header from './Header';
import HeroSection from './HeroSection';
import KeyMetrics from './KeyMetrics';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-slate-200 font-sans flex flex-col selection:bg-primary/30 selection:text-white">
      <Header />
      <main className="flex-grow flex flex-col">
        {/* Hero is full-screen with its own background */}
        <HeroSection />

        {/* Content sections below the hero */}
        <div className="bg-[#0c0c0c]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <KeyMetrics />
            <HowItWorks />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
