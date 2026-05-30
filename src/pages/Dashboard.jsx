// src/pages/Dashboard.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import MapViewer from '../components/map/MapViewer';
import LayerSidebar from '../components/sidebar/LayerSidebar';
import InsightsPanel from '../components/sidebar/InsightsPanel';
import { DISTRICTS, TRANSITIONS } from '../data/mockData';

// ── Map file resolution ───────────────────────────────────────────────────────
function resolveUrl(activeLayer, selectedYear, selectedTransition) {
  if (activeLayer === 'change') {
    const t = TRANSITIONS.find(t => t.id === selectedTransition);
    return t ? `/tiles/change/${t.id}/{z}/{x}/{y}.png` : null;
  }
  if (activeLayer === 'ndvi') return `/tiles/ndvi/${selectedYear}/{z}/{x}/{y}.png`;
  return `/tiles/baseline/${selectedYear}/{z}/{x}/{y}.png`;
}

// ── Dashboard Page ────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [activeLayer,        setActiveLayer]        = useState('green_cover');
  const [selectedYear,       setSelectedYear]       = useState('2024');
  const [selectedTransition, setSelectedTransition] = useState('2023_to_2024');
  const [selectedDistrict,   setSelectedDistrict]   = useState('');

  const tileUrl      = useMemo(() => resolveUrl(activeLayer, selectedYear, selectedTransition), [activeLayer, selectedYear, selectedTransition]);
  const district     = DISTRICTS.find(d => d.id === selectedDistrict);
  const districtBounds = district ? district.bounds : null;

  return (
    <div className="flex h-screen w-screen bg-gray-950 overflow-hidden">
      <LayerSidebar
        activeLayer={activeLayer}          setActiveLayer={setActiveLayer}
        selectedYear={selectedYear}        setSelectedYear={setSelectedYear}
        selectedTransition={selectedTransition} setSelectedTransition={setSelectedTransition}
        selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict}
      />

      {/* Map fills remaining space */}
      <div className="flex-1 relative">
        <MapViewer tileUrl={tileUrl} districtBounds={districtBounds} />

        {/* Top-right nav pill */}
        <div className="absolute top-4 right-4 z-[900]">
          <Link to="/methodology"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-full text-gray-300 text-xs font-medium hover:border-emerald-600 hover:text-emerald-300 transition-all shadow-xl">
            <BookOpen size={13} />
            Methodology & Evaluation
          </Link>
        </div>
      </div>

      <InsightsPanel
        activeLayer={activeLayer}
        selectedYear={selectedYear}
        selectedTransition={selectedTransition}
      />
    </div>
  );
};

export default Dashboard;
