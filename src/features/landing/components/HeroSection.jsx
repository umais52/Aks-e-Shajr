import { useNavigate } from 'react-router-dom';
import { MapPin, FileText } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Map background — real Karachi map image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/karachi-map.png"
          alt="Karachi map"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.35) saturate(0.6)' }}
        />
        {/* Green tint overlay for thematic feel */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 55% 45%, rgba(105,221,146,0.06) 0%, transparent 65%)'
        }} />
        {/* Dark fade at bottom so content sections transition smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0c0c0c]" />
      </div>

      {/* Live status badge */}
      <div className="relative z-10 flex items-center gap-2 bg-black/40 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Live monitoring active</span>
      </div>

      {/* Hero text */}
      <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
          Monitoring Karachi's<br />
          <span className="text-primary">Green Future</span>
        </h1>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-lg">
          Advanced satellite analytics and environmental intelligence platform designed for scientists and urban planners to track ecological shifts in real-time.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => {/* navigate to map */}}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-surface text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(105,221,146,0.4)] hover:shadow-[0_0_28px_rgba(105,221,146,0.6)]"
          >
            <MapPin className="w-4 h-4" />
            Explore Map
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors backdrop-blur-sm">
            <FileText className="w-4 h-4" />
            Latest Report
          </button>
        </div>
      </div>
    </section>
  );
}
