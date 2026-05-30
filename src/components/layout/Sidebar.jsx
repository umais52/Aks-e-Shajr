import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map as MapIcon, Settings, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeItem = location.pathname.includes('/dashboard') ? 'dashboard' : 'map';
  
  const [ndviFilter, setNdviFilter] = useState(true);
  const [heatmapFilter, setHeatmapFilter] = useState(true);
  const [cloudFilter, setCloudFilter] = useState(15);
  return (
    <div className="w-[280px] h-full bg-surface border-r border-border flex flex-col justify-between py-6 shrink-0 z-20">
      
      {/* Top Section */}
      <div className="flex flex-col gap-8 px-6">
        
        {/* Branding */}
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--color-primary)"/>
            <path d="M2 17L12 22L22 17" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-bold text-white tracking-widest">AKS-E-SHAJR</span>
        </div>

        {/* Main Nav */}
        <nav className="flex flex-col gap-2">
          <Button 
            variant={activeItem === 'dashboard' ? 'navActive' : 'nav'} 
            className="gap-3 font-medium"
            onClick={() => navigate('/dashboard')}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Button>
          <Button 
            variant={activeItem === 'map' ? 'navActive' : 'nav'} 
            className="gap-3 font-medium"
            onClick={() => navigate('/map')}
          >
            <MapIcon className="w-5 h-5" />
            <span>Map</span>
          </Button>
        </nav>

        {/* Filters - Hidden on Dashboard */}
        {activeItem !== 'dashboard' && (
          <div className="flex flex-col gap-4 mt-4">
            <h3 className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Filters & Layers</h3>
            
            <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setNdviFilter(!ndviFilter)}>
              <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${ndviFilter ? 'border-primary bg-primary' : 'border-muted-foreground bg-transparent'}`}>
                {ndviFilter && <svg className="w-3 h-3 text-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">NDVI</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setHeatmapFilter(!heatmapFilter)}>
              <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${heatmapFilter ? 'border-primary bg-primary' : 'border-muted-foreground bg-transparent'}`}>
                {heatmapFilter && <svg className="w-3 h-3 text-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Heatmaps</span>
            </label>

            <div className="mt-2 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted">Cloud Filter</span>
                <span className="text-primary">{cloudFilter}%</span>
              </div>
              {/* Custom slider track */}
              <div className="relative w-full h-2 flex items-center">
                <div className="absolute w-full h-1 bg-border rounded-full pointer-events-none"></div>
                <div 
                  className="absolute h-1 bg-primary rounded-full pointer-events-none" 
                  style={{ width: `${cloudFilter}%` }}
                ></div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={cloudFilter}
                  onChange={(e) => setCloudFilter(e.target.value)}
                  className="w-full absolute opacity-0 cursor-pointer h-full z-10"
                />
                <div 
                  className="absolute w-3 h-3 bg-primary rounded-full border-2 border-surface pointer-events-none transition-transform"
                  style={{ left: `calc(${cloudFilter}% - 6px)` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Location Search */}
        <div className="flex flex-col gap-2 mt-4">
          <h3 className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Location</h3>
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Enter Location" 
              className="w-full pl-4 pr-10"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 px-6">
        <Button className="w-full py-6 font-bold tracking-widest uppercase relative overflow-hidden group border border-primary/30">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
          AI REPORT
        </Button>

        <div className="flex items-center justify-between p-3 rounded-md hover:bg-surface-elevated cursor-pointer transition-colors mt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-primary-dark text-primary flex items-center justify-center font-bold text-sm">
              UW
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white font-medium">Umais Wahab</span>
              <span className="text-[11px] text-muted-foreground">Free Plan</span>
            </div>
          </div>
          <Settings className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

    </div>
  );
}
