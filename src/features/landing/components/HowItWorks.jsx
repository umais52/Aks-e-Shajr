import { Database, Cpu, BarChart2 } from 'lucide-react';

const steps = [
  {
    icon: Database,
    number: '1.',
    title: 'Data Acquisition',
    description: 'Continuous ingestion of Sentinel, Aqua and Landsat remote-sensing imagery, normalized by atmospheric and radiometric functions.',
  },
  {
    icon: Cpu,
    number: '2.',
    title: 'Processing Pipeline',
    description: 'Acquisition with GEE and Cloud segmentation-engine algorithms to identify land segments, organized by date range.',
  },
  {
    icon: BarChart2,
    number: '3.',
    title: 'Actionable Insights',
    description: 'Delta computation produces AI-enriched reports, alerting scientists, policymakers and urban decision-makers.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 border-t border-border">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-white tracking-tight">Analytical Methodology</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          A systematically automated, scientifically reviewed approach to rare conservation efforts, now using digital means in our legacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors group"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-bold text-white">{step.number} {step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
