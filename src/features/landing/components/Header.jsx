import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/60 backdrop-blur-md border-b border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#69DD92"/>
          <path d="M2 17L12 22L22 17" stroke="#69DD92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#69DD92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-white font-bold text-sm tracking-widest">AKS-E-SHAJR</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        {['Home', 'Pricing', 'About'].map((item) => (
          <a key={item} href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
        ))}
      </nav>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/auth')}
          className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-1.5"
        >
          Log In
        </button>
        <button
          onClick={() => navigate('/auth')}
          className="text-sm bg-primary hover:bg-primary-hover text-surface font-semibold px-4 py-1.5 rounded-md transition-colors shadow-[0_0_12px_rgba(105,221,146,0.3)]"
        >
          Sign up
        </button>
      </div>
    </header>
  );
}
