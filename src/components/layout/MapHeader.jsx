import { useState } from 'react';
import { RefreshCw, Share2 } from 'lucide-react';
import ShareModal from '../../features/map/components/ShareModal';

export default function MapHeader() {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <div className="h-[80px] w-full flex items-center justify-between px-8 z-10 pointer-events-auto shrink-0 bg-gradient-to-b from-[#0e0e0e]/80 to-transparent absolute top-0 left-0 right-0">
        
        {/* Temporal Scan Filter */}
        <div className="flex items-center gap-4 bg-surface-elevated/80 backdrop-blur-md border border-border rounded-full px-6 py-2">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Temporal Scan</span>
          <div className="flex items-center gap-2 text-sm font-mono">
            <span className="text-primary">2022</span>
            <span className="text-muted-foreground">—</span>
            <span className="text-primary">2026</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md border border-border hover:bg-border transition-colors rounded-full px-5 py-2 text-sm text-white font-medium">
            <RefreshCw className="w-4 h-4" />
            <span>Sync</span>
          </button>
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md border border-border hover:bg-border transition-colors rounded-full px-5 py-2 text-sm text-white font-medium"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

      </div>

      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
