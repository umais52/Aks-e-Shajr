// src/components/sidebar/InsightsPanel.jsx
import React from 'react';
import { TrendingDown, TrendingUp, Droplets, AlertTriangle, Brain } from 'lucide-react';
import { CITY_TOTALS, DISTRICT_STATS, TRANSITION_CONTEXT } from '../../data/mockData';

const StatCard = ({ label, value, sub }) => (
  <div className="bg-gray-800/60 border border-gray-700/60 rounded-xl px-4 py-3">
    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{label}</p>
    <p className="text-xl font-bold text-white">{value}</p>
    {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
  </div>
);

const InsightsPanel = ({ activeLayer, selectedYear, selectedTransition }) => {
  const totals = CITY_TOTALS[selectedYear] || {};
  const prevYear = { '2021':'2019','2023':'2021','2024':'2023','2025':'2024','Future':'2025' }[selectedYear];
  const prevTotals = prevYear ? CITY_TOTALS[prevYear] : null;
  const deltaPct = prevTotals
    ? (((totals.total_green - prevTotals.total_green) / prevTotals.total_green) * 100).toFixed(1)
    : null;

  const ctx = TRANSITION_CONTEXT[selectedTransition];

  const isFuture = selectedYear === 'Future';

  return (
    <aside className="w-80 flex-shrink-0 bg-gray-900 border-l border-gray-800 flex flex-col h-full overflow-y-auto">
      <div className="px-5 py-4 border-b border-gray-800 bg-gray-950">
        <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Analytical Insights</h2>
        <p className="text-[10px] text-gray-500 mt-0.5">
          {activeLayer === 'change' ? `Transition: ${selectedTransition?.replace(/_/g,' ')}` : `Epoch: ${selectedYear}`}
        </p>
      </div>

      <div className="px-4 py-5 flex flex-col gap-5">
        {/* City-Level Stats (non-change mode) */}
        {activeLayer !== 'change' && (
          <>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">City-Wide Metrics</p>
              <div className="grid grid-cols-2 gap-2">
                <StatCard label="Green Cover" value={`${totals.total_green} km²`} sub="vegetated area" />
                <StatCard label="% of City" value={`${totals.pct}%`} sub={`of ${totals.total_area} km²`} />
                {deltaPct && (
                  <div className={`col-span-2 flex items-center gap-3 px-4 py-3 rounded-xl border ${
                    parseFloat(deltaPct) >= 0 ? 'bg-emerald-900/20 border-emerald-700/40' : 'bg-red-900/20 border-red-700/40'
                  }`}>
                    {parseFloat(deltaPct) >= 0 ? <TrendingUp size={18} className="text-emerald-400 flex-shrink-0" /> : <TrendingDown size={18} className="text-red-400 flex-shrink-0" />}
                    <div>
                      <p className={`text-base font-bold ${parseFloat(deltaPct) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{deltaPct}%</p>
                      <p className="text-[10px] text-gray-500">vs {prevYear} baseline</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isFuture && (
              <div className="bg-purple-900/20 border border-purple-700/40 rounded-xl px-4 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain size={15} className="text-purple-400" />
                  <p className="text-xs font-bold text-purple-300 uppercase tracking-wider">ML Forecast</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Projected using a linear temporal regression model trained on 2019–2025 validated U-Net outputs.
                  The forecast assumes no major monsoon anomaly and extrapolates current aridification trends
                  to a 2027 horizon. Confidence interval: ±1.8 km².
                </p>
              </div>
            )}

            {/* District breakdown table */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">District Breakdown</p>
              <div className="flex flex-col gap-1">
                {(DISTRICT_STATS[selectedYear] || []).map(row => (
                  <div key={row.district} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <span className="text-xs text-gray-400">{row.district}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(row.pct_green * 3, 100)}%` }} />
                      </div>
                      <span className="text-xs font-mono text-emerald-400 w-10 text-right">{row.pct_green}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Change Detection Context */}
        {activeLayer === 'change' && ctx && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">Transition Analysis</p>
            <div className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-white leading-snug">{ctx.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${ctx.badgeColor}`}>{ctx.badge}</span>
              </div>
              <p className={`text-2xl font-bold ${ctx.deltaColor}`}>{ctx.delta}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{ctx.body}</p>
            </div>
          </div>
        )}

        {activeLayer === 'change' && !ctx && (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <AlertTriangle size={28} className="text-gray-600" />
            <p className="text-sm text-gray-500">Select a transition period to view analytical context.</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default InsightsPanel;
