// src/components/charts/MetricsChart.jsx
// Zero-dependency chart components using pure SVG + CSS.
// Replaces recharts to avoid React 19 / Vite 8 compatibility crashes.
import React from 'react';
import { MODEL_METRICS, CONFUSION_MATRIX } from '../../data/mockData';

// ── Shared colour palette ─────────────────────────────────────────────────────
const METRIC_COLORS = {
  accuracy:  '#34d399',
  precision: '#60a5fa',
  recall:    '#f472b6',
  f1:        '#a78bfa',
  iou:       '#fbbf24',
};

const KEYS = ['accuracy', 'precision', 'recall', 'f1'];
const KEY_LABELS = { accuracy: 'Accuracy', precision: 'Precision', recall: 'Recall', f1: 'F1-Score' };

// ── Grouped bar chart (pure SVG) ──────────────────────────────────────────────
export const PerformanceBarChart = () => {
  const W = 560, H = 240, PAD = { top: 20, right: 20, bottom: 40, left: 44 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top  - PAD.bottom;
  const minY = 0.8, maxY = 1.0;
  const yTicks = [0.80, 0.85, 0.90, 0.95, 1.00];
  const toY = v => innerH - ((v - minY) / (maxY - minY)) * innerH;

  const groupW   = innerW / MODEL_METRICS.length;
  const barW     = (groupW * 0.7) / KEYS.length;
  const groupGap = groupW * 0.15;

  return (
    <div className="bg-gray-800/60 border border-gray-700/60 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-white mb-1">Validation Metrics by Epoch</h3>
      <p className="text-xs text-gray-500 mb-4">Per-year segmentation performance on held-out validation tiles</p>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 300 }}>
          <g transform={`translate(${PAD.left},${PAD.top})`}>
            {/* Grid lines */}
            {yTicks.map(t => (
              <g key={t}>
                <line x1={0} x2={innerW} y1={toY(t)} y2={toY(t)} stroke="#374151" strokeDasharray="4 3" />
                <text x={-6} y={toY(t) + 4} textAnchor="end" fill="#6b7280" fontSize={10}>
                  {`${(t * 100).toFixed(0)}%`}
                </text>
              </g>
            ))}

            {/* Bars */}
            {MODEL_METRICS.map((d, gi) => {
              const gx = gi * groupW + groupGap;
              return (
                <g key={d.dataset}>
                  {/* X label */}
                  <text x={gx + groupW * 0.35} y={innerH + 16} textAnchor="middle" fill="#9ca3af" fontSize={10}>
                    {d.dataset.replace(' Val', '')}
                  </text>
                  {/* Bars per metric */}
                  {KEYS.map((k, ki) => {
                    const bh = ((d[k] - minY) / (maxY - minY)) * innerH;
                    const bx = gx + ki * (barW + 1);
                    const by = toY(d[k]);
                    return (
                      <g key={k}>
                        <rect x={bx} y={by} width={barW} height={bh} fill={METRIC_COLORS[k]} rx={2} opacity={0.85} />
                        <title>{`${KEY_LABELS[k]}: ${(d[k]*100).toFixed(1)}%`}</title>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 justify-center">
        {KEYS.map(k => (
          <div key={k} className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: METRIC_COLORS[k] }} />
            {KEY_LABELS[k]}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Radar chart (pure SVG) ────────────────────────────────────────────────────
export const RadarMetricChart = () => {
  const cx = 150, cy = 120, r = 90;
  const axes = ['Accuracy', 'F1', 'Precision', 'Recall', 'IoU'];
  const n = axes.length;
  const angleOf = i => (Math.PI * 2 * i) / n - Math.PI / 2;

  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const normalize = (key, val) => {
    const min = 0.75, max = 1.0;
    return Math.max(0, Math.min(1, (val - min) / (max - min)));
  };

  const toXY = (i, norm) => ({
    x: cx + norm * r * Math.cos(angleOf(i)),
    y: cy + norm * r * Math.sin(angleOf(i)),
  });

  const datasetColors = ['#34d399','#a78bfa','#60a5fa','#f472b6', '#fbbf24'];

  return (
    <div className="bg-gray-800/60 border border-gray-700/60 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-white mb-1">Multi-Metric Radar</h3>
      <p className="text-xs text-gray-500 mb-4">Accuracy / F1 / IoU cross-epoch comparison</p>
      <div className="flex justify-center">
        <svg viewBox="0 0 300 240" className="w-full max-w-xs">
          {/* Grid rings */}
          {gridLevels.map(lvl => (
            <polygon key={lvl}
              points={axes.map((_, i) => { const p = toXY(i, lvl); return `${p.x},${p.y}`; }).join(' ')}
              fill="none" stroke="#374151" strokeWidth={0.8} />
          ))}
          {/* Axis spokes */}
          {axes.map((_, i) => {
            const tip = toXY(i, 1);
            return <line key={i} x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#4b5563" strokeWidth={0.8} />;
          })}
          {/* Axis labels */}
          {axes.map((ax, i) => {
            const tip = toXY(i, 1.2);
            return <text key={ax} x={tip.x} y={tip.y} textAnchor="middle" dominantBaseline="middle" fill="#9ca3af" fontSize={9}>{ax}</text>;
          })}
          {/* Dataset polygons */}
          {MODEL_METRICS.map((d, di) => {
            const vals = [d.accuracy, d.f1, d.precision, d.recall, d.iou];
            const pts = vals.map((v, i) => { const p = toXY(i, normalize(axes[i], v)); return `${p.x},${p.y}`; }).join(' ');
            return (
              <polygon key={d.dataset} points={pts}
                fill={datasetColors[di]} fillOpacity={0.15}
                stroke={datasetColors[di]} strokeWidth={1.5} />
            );
          })}
        </svg>
      </div>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {MODEL_METRICS.map((d, i) => (
          <div key={d.dataset} className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: datasetColors[i] }} />
            {d.dataset}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Confusion Matrix Table ────────────────────────────────────────────────────
export const ConfusionTable = () => (
  <div className="bg-gray-800/60 border border-gray-700/60 rounded-2xl p-5 overflow-x-auto">
    <h3 className="text-sm font-bold text-white mb-1">Classification Report</h3>
    <p className="text-xs text-gray-500 mb-4">Confusion matrix pixel counts from held-out geographic validation tiles</p>
    <table className="w-full text-xs">
      <thead>
        <tr className="text-gray-500 uppercase tracking-wider text-[10px]">
          <th className="text-left pb-2 pr-4">Epoch</th>
          <th className="text-right pb-2 px-3 text-emerald-400">TP</th>
          <th className="text-right pb-2 px-3 text-blue-400">FP</th>
          <th className="text-right pb-2 px-3 text-orange-400">FN</th>
          <th className="text-right pb-2 pl-3 text-gray-400">TN</th>
          <th className="text-right pb-2 pl-3 text-purple-400">F1</th>
        </tr>
      </thead>
      <tbody>
        {CONFUSION_MATRIX.map(row => {
          const f1 = ((2*row.tp) / (2*row.tp + row.fp + row.fn) * 100).toFixed(1);
          return (
            <tr key={row.label} className="border-t border-gray-700/60">
              <td className="py-2 pr-4 text-gray-300 font-medium">{row.label}</td>
              <td className="py-2 px-3 text-right font-mono text-emerald-400">{(row.tp/1000).toFixed(1)}k</td>
              <td className="py-2 px-3 text-right font-mono text-blue-400">{(row.fp/1000).toFixed(1)}k</td>
              <td className="py-2 px-3 text-right font-mono text-orange-400">{(row.fn/1000).toFixed(1)}k</td>
              <td className="py-2 pl-3 text-right font-mono text-gray-500">{(row.tn/1000).toFixed(1)}k</td>
              <td className="py-2 pl-3 text-right font-mono text-purple-400">{f1}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// ── Linear Regression Scatter Chart (pure SVG) ────────────────────────────────
export const RegressionScatterChart = () => {
  const W = 560, H = 240, PAD = { top: 20, right: 30, bottom: 40, left: 50 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top  - PAD.bottom;
  
  // Data points
  const points = [
    { year: 2019, area: 218.3 },
    { year: 2021, area: 185.7 },
    { year: 2023, area: 326.6 },
    { year: 2024, area: 199.3 },
    { year: 2025, area: 179.9 },
  ];
  
  const minX = 2018, maxX = 2028;
  const minY = 100, maxY = 350;
  
  const toX = x => ((x - minX) / (maxX - minX)) * innerW;
  const toY = y => innerH - ((y - minY) / (maxY - minY)) * innerH;

  // Regression line (y = mx + b)
  // Using previously calculated slope = -13.04, intercept = 26569.89
  const m = -13.04;
  const b = 26569.89;
  
  const lineY1 = m * minX + b;
  const lineY2 = m * maxX + b;
  const predY2027 = m * 2027 + b;

  return (
    <div className="bg-gray-800/60 border border-gray-700/60 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-white mb-1">Linear Regression: 2027 Future Prediction</h3>
      <p className="text-xs text-gray-500 mb-4">Historical green cover area vs. Ordinary Least Squares (OLS) regression trajectory</p>
      
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 400 }}>
          <g transform={`translate(${PAD.left},${PAD.top})`}>
            {/* Grid & Y Axis */}
            {[100, 150, 200, 250, 300, 350].map(t => (
              <g key={`y-${t}`}>
                <line x1={0} x2={innerW} y1={toY(t)} y2={toY(t)} stroke="#374151" strokeDasharray="3 3" opacity={0.5} />
                <text x={-8} y={toY(t) + 3} textAnchor="end" fill="#6b7280" fontSize={10}>{t} km²</text>
              </g>
            ))}
            
            {/* X Axis */}
            {[2019, 2021, 2023, 2024, 2025, 2027].map(t => (
              <g key={`x-${t}`}>
                <text x={toX(t)} y={innerH + 16} textAnchor="middle" fill="#9ca3af" fontSize={10} fontWeight={t === 2027 ? 'bold' : 'normal'} fill={t === 2027 ? '#fbbf24' : '#9ca3af'}>{t}</text>
              </g>
            ))}

            {/* Regression Line */}
            <line 
              x1={toX(minX)} y1={toY(lineY1)} 
              x2={toX(maxX)} y2={toY(lineY2)} 
              stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 2" opacity={0.8}
            />

            {/* Historical Data Points */}
            {points.map((p, i) => (
              <g key={i}>
                <circle cx={toX(p.year)} cy={toY(p.area)} r={4} fill="#34d399" />
                <circle cx={toX(p.year)} cy={toY(p.area)} r={8} fill="#34d399" opacity={0.2} />
              </g>
            ))}

            {/* Prediction Point */}
            <g>
              <circle cx={toX(2027)} cy={toY(predY2027)} r={5} fill="#ef4444" stroke="#fbbf24" strokeWidth={2} />
              <circle cx={toX(2027)} cy={toY(predY2027)} r={12} fill="#ef4444" opacity={0.2} />
              <text x={toX(2027)} y={toY(predY2027) - 15} textAnchor="middle" fill="#ef4444" fontSize={10} fontWeight="bold">
                {predY2027.toFixed(1)} km²
              </text>
            </g>
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap gap-4 mt-3 justify-center">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Historical
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-3 h-0.5 bg-amber-400 border border-amber-400 border-dashed" /> Trendline
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-amber-400" /> 2027 Prediction
        </div>
      </div>
    </div>
  );
};
