import { useState, useRef, useEffect } from 'react';
import MapContainer from './MapContainer';
import BottomPanel from './BottomPanel';
import { ChevronUp } from 'lucide-react';

export default function MapDashboard() {
  const [panelHeight, setPanelHeight] = useState(250);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      if (dashboardRef.current) {
        const dashboardRect = dashboardRef.current.getBoundingClientRect();
        const newHeight = dashboardRect.bottom - e.clientY;
        // Clamp height between 100px and 80% of screen
        const clampedHeight = Math.max(100, Math.min(newHeight, dashboardRect.height * 0.8));
        setPanelHeight(clampedHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div ref={dashboardRef} className="flex flex-col flex-1 relative overflow-hidden">
      <MapContainer />
      
      {/* Resize Handle */}
      {isPanelOpen && (
        <div 
          className="h-1.5 w-full bg-border hover:bg-primary cursor-row-resize z-30 transition-colors shrink-0"
          onMouseDown={() => setIsDragging(true)}
        />
      )}

      {/* Bottom Panel Container */}
      {isPanelOpen ? (
        <div 
          style={{ height: `${panelHeight}px` }} 
          className="shrink-0 relative border-t border-border"
        >
          <BottomPanel onClose={() => setIsPanelOpen(false)} />
        </div>
      ) : (
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface border border-border hover:bg-surface-elevated text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg z-30 transition-colors text-sm font-medium"
        >
          <ChevronUp className="w-4 h-4" />
          Show Data Panel
        </button>
      )}
    </div>
  );
}
