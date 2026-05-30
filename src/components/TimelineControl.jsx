import React from 'react';

const TimelineControl = ({ mode, selectedYear, setSelectedYear, selectedTransition, setSelectedTransition }) => {
  const years = ['2019', '2021', '2023', '2024'];
  const transitions = [
    { id: '2019_to_2021', label: '2019 - 2021' },
    { id: '2021_to_2023', label: '2021 - 2023' },
    { id: '2023_to_2024', label: '2023 - 2024' },
  ];

  if (mode === 'baseline') {
    return (
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Select Year</h2>
        <div className="grid grid-cols-2 gap-2">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`py-3 px-4 rounded-lg border text-sm transition-all font-medium ${
                selectedYear === year 
                  ? 'border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                  : 'border-gray-700 bg-gray-800 hover:border-gray-500 text-gray-300'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Select Transition Period</h2>
      <div className="flex flex-col gap-3">
        {transitions.map(t => (
          <label key={t.id} className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${selectedTransition === t.id ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
            <input 
              type="radio" 
              name="transition" 
              value={t.id}
              checked={selectedTransition === t.id}
              onChange={() => setSelectedTransition(t.id)}
              className="w-4 h-4 text-blue-500 focus:ring-blue-500 bg-gray-900 border-gray-600 focus:ring-offset-gray-800"
            />
            <span className={`text-sm font-medium ${selectedTransition === t.id ? 'text-blue-400' : 'text-gray-300'}`}>{t.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TimelineControl;
