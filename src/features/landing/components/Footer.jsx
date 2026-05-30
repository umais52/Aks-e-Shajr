export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        {/* Logo + tagline */}
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#69DD92"/>
            <path d="M2 17L12 22L22 17" stroke="#69DD92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#69DD92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">AKS-E-SHAJR · ENV.SYSTEMS</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6 text-[11px] text-slate-600">
          <span>v 1.0.1</span>
          <span>Hackathon 2026</span>
        </div>
      </div>
    </footer>
  );
}
