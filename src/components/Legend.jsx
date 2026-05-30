import React from 'react';

const Legend = ({ mode }) => {
  if (mode === 'baseline') {
    return (
      <div className="mt-auto">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Map Legend</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]"></div>
            <span className="text-sm text-gray-300 font-medium">Vegetation / Green Cover</span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-4 h-4 rounded-full border border-gray-600 bg-transparent"></div>
            <span className="text-sm text-gray-400">Barren / Non-Vegetation</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-auto">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Map Legend</h2>
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 shadow-inner flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]"></div>
          <span className="text-sm text-gray-300 font-medium">Vegetation Gain</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-transparent border border-gray-600"></div>
          <span className="text-sm text-gray-400">Stable</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]"></div>
          <span className="text-sm text-gray-300 font-medium">Vegetation Loss</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;
