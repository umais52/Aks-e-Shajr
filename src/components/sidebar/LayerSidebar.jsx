// src/components/sidebar/LayerSidebar.jsx
import React from 'react';
import { Layers, Map, Activity, ChevronDown, CalendarRange } from 'lucide-react';
import { YEARS, LAYERS, DISTRICTS, TRANSITIONS } from '../../data/mockData';

const Section = ({ title, children }) => (
  <div>
    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">{title}</p>
    {children}
  </div>
);

const LayerSidebar = ({ activeLayer, setActiveLayer, selectedYear, setSelectedYear, selectedTransition, setSelectedTransition, selectedDistrict, setSelectedDistrict }) => {
  const yearLabels = { '2019':'2019','2021':'2021','2023':'2023','2024':'2024','2025':'2025','Future':'2027 Pred.' };
  const layerIcons = { green_cover: <Map size={14}/>, ndvi: <Activity size={14}/>, change: <Layers size={14}/> };

  return (
    <aside className="w-72 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col h-full z-10">
      <div className="px-5 py-4 border-b border-gray-800 bg-gray-950">
        <h1 className="text-lg font-bold text-emerald-400 tracking-wider">Aks-e-Shajr</h1>
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.12em] mt-0.5">Urban Green Cover · Karachi</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-6">
        <Section title="Layer Type">
          <div className="flex flex-col gap-1">
            {LAYERS.map(l => (
              <button key={l.id} onClick={() => setActiveLayer(l.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${activeLayer === l.id ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-600/40' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}>
                <span className={activeLayer === l.id ? 'text-emerald-400' : 'text-gray-600'}>{layerIcons[l.id]}</span>
                {l.label}
              </button>
            ))}
          </div>
        </Section>
        {activeLayer !== 'change' && (
          <Section title="Temporal Epoch">
            <div className="grid grid-cols-3 gap-1.5">
              {YEARS.map(y => (
                <button key={y} onClick={() => setSelectedYear(y)}
                  className={`py-1.5 text-xs rounded-md border transition-all font-medium ${selectedYear === y ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200 bg-gray-800/40'}`}>
                  {yearLabels[y]}
                </button>
              ))}
            </div>
          </Section>
        )}
        {activeLayer === 'change' && (
          <Section title="Transition Period">
            <div className="flex flex-col gap-1.5">
              {TRANSITIONS.map(t => (
                <button key={t.id} onClick={() => setSelectedTransition(t.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${selectedTransition === t.id ? 'bg-blue-600/20 text-blue-300 border-blue-600/40' : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200 bg-gray-800/40'}`}>
                  <CalendarRange size={13} className="flex-shrink-0" />{t.label}
                </button>
              ))}
            </div>
          </Section>
        )}
        <Section title="District Focus">
          <div className="relative">
            <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full appearance-none bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-emerald-600 cursor-pointer">
              <option value="">— City-Wide View —</option>
              {DISTRICTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </Section>
        <Section title="Legend">
          {activeLayer !== 'change' ? (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-300"><span className="w-3 h-3 rounded-sm bg-emerald-500 flex-shrink-0" />Vegetation / Green Cover</div>
              <div className="flex items-center gap-2 text-xs text-gray-500"><span className="w-3 h-3 rounded-sm bg-gray-700 border border-gray-600 flex-shrink-0" />Barren / Non-Vegetated</div>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-300"><span className="w-3 h-3 rounded-sm bg-blue-500 flex-shrink-0" />Vegetation Gain</div>
              <div className="flex items-center gap-2 text-xs text-gray-300"><span className="w-3 h-3 rounded-sm bg-red-500 flex-shrink-0" />Vegetation Loss</div>
              <div className="flex items-center gap-2 text-xs text-gray-500"><span className="w-3 h-3 rounded-sm bg-gray-700 border border-gray-600 flex-shrink-0" />No Change</div>
            </div>
          )}
        </Section>
      </div>
    </aside>
  );
};
export default LayerSidebar;
