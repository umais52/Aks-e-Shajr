import React from 'react';
import MapHeader from '../../../components/layout/MapHeader';
import { Card } from '../../../components/ui/card';
import { TrendingDown, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function DashboardScreen() {
  return (
    <div className="flex-1 flex flex-col relative overflow-y-auto bg-background">
      <MapHeader />

        <div className="p-8 mt-[80px] flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
          
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-5 flex flex-col gap-2 bg-surface border-border">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Total Green Cover</span>
              <div className="text-3xl font-bold text-primary tracking-tight">18.4%</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <TrendingDown className="w-3 h-3" />
                <span>2.1% from 2020</span>
              </div>
            </Card>

            <Card className="p-5 flex flex-col gap-2 bg-surface border-border">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Area Lost (HA)</span>
              <div className="text-3xl font-bold text-[#e76f51] tracking-tight">3,240</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <RefreshCw className="w-3 h-3" />
                <span>since last year</span>
              </div>
            </Card>

            <Card className="p-5 flex flex-col gap-2 bg-surface border-border">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Model Accuracy</span>
              <div className="text-3xl font-bold text-white tracking-tight">91.7%</div>
              <div className="flex items-center gap-1 text-xs text-primary mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>IoU score</span>
              </div>
            </Card>

            <Card className="p-5 flex flex-col gap-2 bg-surface border-border">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">High-Risk Zones</span>
              <div className="text-3xl font-bold text-[#e9c46a] tracking-tight">7</div>
              <div className="text-xs text-[#e76f51] mt-1">districts flagged</div>
            </Card>
          </div>

          {/* Main Dashboard Layout */}
          <div className="flex gap-6 min-h-[500px]">
            
            {/* Heatmap Panel (Left side) */}
            <Card className="flex-1 bg-surface border-border p-0 flex flex-col overflow-hidden relative">
              <div className="p-6 flex items-center justify-between border-b border-border z-10 relative bg-surface/50 backdrop-blur-sm">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Green cover heatmap · Karachi</h2>
                  <p className="text-sm text-muted-foreground mt-1">NDVI-derived · May 2026</p>
                </div>
                <div className="flex items-center bg-background rounded-md border border-border overflow-hidden">
                  <button className="px-4 py-1.5 text-xs font-medium bg-border text-white">2026</button>
                  <button className="px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-white transition-colors">2023</button>
                  <button className="px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-white transition-colors">2020</button>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="flex-1 relative bg-[#0e0e0e]">
                {/* Simulated Heatmap points */}
                <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-[#e76f51]/20 blur-3xl rounded-full"></div>
                
                {/* Labels */}
                <div className="absolute top-1/2 left-1/3 text-[10px] text-primary font-bold tracking-widest uppercase">Gulshan</div>
                <div className="absolute bottom-1/3 right-1/3 text-[10px] text-primary font-bold tracking-widest uppercase">Clifton</div>
                <div className="absolute bottom-1/4 left-[30%] text-[10px] text-[#e76f51] font-bold tracking-widest uppercase">Korangi</div>
                
                {/* Subtle grid to simulate map */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none" />
              </div>
            </Card>

            {/* Right Side Panels */}
            <div className="w-[320px] flex flex-col gap-6 shrink-0">
              
              {/* Alerts */}
              <Card className="bg-surface border-border p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">Alerts</h3>
                  <span className="text-[9px] font-bold text-[#e76f51] bg-[#e76f51]/10 px-2 py-0.5 rounded">3 NEW</span>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e76f51] mt-1.5 shrink-0"></div>
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-xs text-white">Significant loss detected — Gulshan-e-Hadeed</p>
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[10px] text-muted-foreground">2h ago</span>
                        <span className="text-[10px] text-[#e76f51] font-mono">-12.4 ha</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-border"></div>
                  
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e9c46a] mt-1.5 shrink-0"></div>
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-xs text-white">Moderate NDVI decline — Korangi Industrial</p>
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[10px] text-muted-foreground">1d ago</span>
                        <span className="text-[10px] text-[#e9c46a] font-mono">-5.2 ha</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-border"></div>
                  
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-xs text-white">New imagery processed — full city sync</p>
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[10px] text-muted-foreground">Today · 09:14</span>
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* District Breakdown */}
              <Card className="bg-surface border-border p-5 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white mb-2">District breakdown</h3>
                
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Gulshan</span>
                      <span className="text-[10px] text-primary font-mono">72%</span>
                    </div>
                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Clifton</span>
                      <span className="text-[10px] text-primary font-mono">55%</span>
                    </div>
                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">DHA</span>
                      <span className="text-[10px] text-primary font-mono">48%</span>
                    </div>
                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Malir</span>
                      <span className="text-[10px] text-primary font-mono">22%</span>
                    </div>
                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </div>

        </div>
    </div>
  );
}
