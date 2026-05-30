import { TrendingDown, AlertTriangle, Satellite } from 'lucide-react';

const metrics = [
  {
    id: 'green-cover',
    label: 'Total Urban Cover',
    value: '42.8',
    unit: 'sq km',
    badge: '-2.1% YOY',
    badgeColor: 'text-destructive bg-destructive/10 border-destructive/20',
    icon: null,
    borderColor: 'border-primary/20',
    glowColor: 'shadow-[0_0_24px_rgba(105,221,146,0.08)]',
  },
  {
    id: 'area-lost',
    label: 'Area Lost (HA)',
    value: '15.3',
    unit: 'sq km',
    badge: 'Active (last 30 days)',
    badgeColor: 'text-destructive bg-destructive/10 border-destructive/20',
    icon: null,
    borderColor: 'border-destructive/20',
    glowColor: 'shadow-[0_0_24px_rgba(220,38,38,0.08)]',
  },
  {
    id: 'satellites',
    label: 'Active Satellites',
    value: '04',
    unit: 'feeds',
    badge: 'Live · UP',
    badgeColor: 'text-primary bg-primary/10 border-primary/20',
    icon: null,
    borderColor: 'border-primary/20',
    glowColor: 'shadow-[0_0_24px_rgba(105,221,146,0.08)]',
  },
];

export default function KeyMetrics() {
  return (
    <section className="py-16">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white tracking-tight">Key Metrics at a Glance</h2>
        <p className="text-sm text-slate-500 mt-1">Real-time aggregate data across all monitored zones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div
            key={m.id}
            className={`relative bg-surface border rounded-xl p-6 flex flex-col gap-3 transition-all ${m.borderColor} ${m.glowColor}`}
          >
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{m.label}</span>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white font-mono tracking-tight">{m.value}</span>
              <span className="text-sm text-muted-foreground mb-1">{m.unit}</span>
            </div>
            <span className={`self-start text-[10px] font-bold px-2 py-0.5 rounded border ${m.badgeColor}`}>
              {m.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
