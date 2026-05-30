import { useState, useEffect } from 'react';
import { Play, SkipBack, SkipForward, TrendingDown, X } from 'lucide-react';
import { Skeleton } from '../../../components/ui/skeleton';

export default function BottomPanel({ onClose }) {
  const [isBeforeAfterActive, setIsBeforeAfterActive] = useState(false);
  const [isAqiActive, setIsAqiActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="h-full w-full bg-surface grid grid-cols-4 divide-x divide-border relative overflow-y-auto overflow-x-hidden">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-1.5 bg-border hover:bg-destructive text-muted hover:text-white rounded-md transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      {/* Land Cover Change */}
      <div className="p-6 flex flex-col">
        <h3 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-6">Land Cover Change</h3>
        <div className="flex flex-col gap-3 flex-1 justify-center">
          {isLoading ? (
            <>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-5 w-3/5" />
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#4a7c59] rounded-sm"></div>
                <span className="text-sm text-gray-300">Stable Green</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-warning rounded-sm"></div>
                <span className="text-sm text-gray-300">Degraded</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-destructive rounded-sm"></div>
                <span className="text-sm text-gray-300">Loss / Deforested</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-info rounded-sm"></div>
                <span className="text-sm text-gray-300">Urban Growth</span>
              </div>
            </>
          )}
        </div>
        <div className="text-[10px] text-muted-foreground font-mono tracking-widest mt-auto">
          {isLoading ? <Skeleton className="h-3 w-24" /> : "UPDATED: 12H AGO"}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-2">Risk Assessment</h3>
        
        {isLoading ? (
          <>
            <Skeleton className="h-[72px] w-full" />
            <Skeleton className="h-[80px] w-full" />
          </>
        ) : (
          <>
            <div className="bg-[#111111] border border-border rounded-md p-4">
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Worst Performer</div>
              <div className="text-white font-medium">Orangi Town</div>
            </div>

            <div className="bg-[#1f1515] border border-destructive/20 rounded-md p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-[10px] text-destructive font-bold uppercase tracking-wider mb-1">Vegetation Lost</div>
                <div className="text-2xl text-white font-mono">-16.7%</div>
              </div>
              <TrendingDown className="w-6 h-6 text-destructive" />
            </div>
          </>
        )}
      </div>

      {/* District Analytics */}
      <div className="p-6 flex flex-col">
        <h3 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-6">District Analytics</h3>
        
        <div className="flex flex-col gap-6 flex-1 justify-center">
          {isLoading ? (
            <>
              <div className="flex flex-col gap-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-1.5 w-full rounded-full" /></div>
              <div className="flex flex-col gap-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-1.5 w-full rounded-full" /></div>
            </>
          ) : (
            <>
              {/* Progress Bar 1 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 uppercase tracking-wider">Orangi</span>
                  <span className="text-destructive font-bold text-[10px] tracking-widest">CRITICAL</span>
                </div>
                <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-destructive w-[85%] rounded-full"></div>
                </div>
              </div>

              {/* Progress Bar 2 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 uppercase tracking-wider">DHA City</span>
                  <span className="text-success font-bold text-[10px] tracking-widest">IMPROVING</span>
                </div>
                <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-success w-[45%] rounded-full"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Simulation Controls */}
      <div className="p-6 flex flex-col justify-between h-full">
        <h3 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Simulation Controls</h3>
        
        {/* Playback — vertically centered */}
        <div className="flex items-center justify-center gap-6">
          <button className="text-muted-foreground hover:text-white transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-primary hover:bg-primary-hover rounded-full flex items-center justify-center text-surface transition-colors shadow-[0_0_15px_rgba(105,221,146,0.3)]">
            <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
          </button>
          <button className="text-muted-foreground hover:text-white transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Accuracy + Toggles row — pinned to bottom */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Accuracy Circle */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Skeleton className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center relative shrink-0">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" stroke="var(--color-primary)" strokeWidth="2.5" fill="none" strokeDasharray="125.6" strokeDashoffset="5" />
                </svg>
                <span className="text-[10px] text-primary font-mono font-bold">96%</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Accuracy</span>
              {isLoading ? <Skeleton className="h-3 w-16 mt-1" /> : <span className="text-xs text-gray-300 italic">High Confidence</span>}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted">Before/After Map</span>
              <div 
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors shrink-0 ${isBeforeAfterActive ? 'bg-primary' : 'bg-border'}`}
                onClick={() => setIsBeforeAfterActive(!isBeforeAfterActive)}
              >
                <div className={`absolute top-0.5 bottom-0.5 w-4 h-4 rounded-full transition-all duration-200 ${isBeforeAfterActive ? 'left-[calc(100%-18px)] bg-surface' : 'left-0.5 bg-muted-foreground'}`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted">AQI Data Layer</span>
              <div 
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors shrink-0 ${isAqiActive ? 'bg-primary' : 'bg-border'}`}
                onClick={() => setIsAqiActive(!isAqiActive)}
              >
                <div className={`absolute top-0.5 bottom-0.5 w-4 h-4 rounded-full transition-all duration-200 ${isAqiActive ? 'left-[calc(100%-18px)] bg-surface' : 'left-0.5 bg-muted-foreground'}`}></div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
