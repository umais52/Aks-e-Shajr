import React from 'react';
import { Plus, Minus, Layers } from 'lucide-react';
import MapHeader from '../../../components/layout/MapHeader';

export default function MapContainer() {
  return (
    <div className="flex-1 relative bg-surface overflow-hidden flex flex-col">
      
      {/* Background Gradient/Image placeholder for Map */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-background bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/20 via-background to-background opacity-60" />
        {/* Subtle grid pattern to emulate map texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      </div>

      <MapHeader />

      {/* Floating Layers Box (Bottom Left) */}
      <div className="absolute bottom-8 left-8 z-10 bg-surface/90 backdrop-blur border border-border rounded-lg p-5 min-w-[200px]">
        <h3 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">Layers Active</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span className="text-xs text-white font-mono uppercase">NDVI (Healthy)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-warning rounded-sm"></div>
            <span className="text-xs text-white font-mono uppercase">Heatmap (High)</span>
          </div>
        </div>
      </div>

      {/* Floating Controls (Right Side) */}
      <div className="absolute top-24 right-8 z-10 flex flex-col gap-4">
        {/* Zoom Controls */}
        <div className="flex flex-col bg-surface-elevated/80 backdrop-blur-md border border-border rounded-lg overflow-hidden">
          <button className="p-3 hover:bg-border text-muted-foreground hover:text-white transition-colors border-b border-border">
            <Plus className="w-5 h-5" />
          </button>
          <button className="p-3 hover:bg-border text-muted-foreground hover:text-white transition-colors">
            <Minus className="w-5 h-5" />
          </button>
        </div>

        {/* Layers Control */}
        <button className="p-3 bg-primary-dark border border-primary/30 text-primary hover:bg-primary-dark/80 rounded-lg transition-colors shadow-lg">
          <Layers className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
