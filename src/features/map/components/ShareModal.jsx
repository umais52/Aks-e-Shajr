import { useState, useEffect } from 'react';
import { X, Copy, Check, Link2 } from 'lucide-react';

const SHARE_URL = 'https://aks-e-shajr.gov.pk/report/analysis-089';

export default function ShareModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for non-secure contexts
      const el = document.createElement('textarea');
      el.value = SHARE_URL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal card */}
      <div
        className="relative z-10 w-[420px] bg-surface border border-border rounded-xl shadow-2xl p-6 flex flex-col gap-4 animate-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modalIn 0.18s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-white font-bold text-lg tracking-tight">Share Link</h2>
            <p className="text-sm text-muted-foreground leading-snug">
              Copy the link below to share this urban green cover analysis.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-border transition-colors shrink-0 mt-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* URL row */}
        <div className="flex items-stretch gap-2">
          <div className="flex-1 flex items-center bg-background border border-border rounded-lg px-4 py-3 min-w-0">
            <Link2 className="w-3.5 h-3.5 text-muted-foreground shrink-0 mr-2" />
            <span className="text-sm font-mono text-slate-300 truncate select-all">
              {SHARE_URL}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all shrink-0
              ${copied
                ? 'bg-primary/80 text-surface cursor-default'
                : 'bg-primary hover:bg-primary-hover text-surface shadow-[0_0_12px_rgba(105,221,146,0.35)] hover:shadow-[0_0_20px_rgba(105,221,146,0.5)]'
              }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
}
