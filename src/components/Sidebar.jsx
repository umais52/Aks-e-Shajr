import TimelineControl from './TimelineControl';
import Legend from './Legend';
import UploadScan from './UploadScan';

const Sidebar = ({ mode, setMode, selectedYear, setSelectedYear, selectedTransition, setSelectedTransition, customScanUrl, setCustomScanUrl }) => {
  return (
    <div className="w-80 flex-shrink-0 bg-gray-800 border-r border-gray-700 flex flex-col z-10 shadow-xl relative">
      <div className="p-6 border-b border-gray-700 bg-gray-900">
        <h1 className="text-2xl font-bold text-green-400 tracking-wider">Aks-e-Shajr</h1>
        <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Urban Green Cover Monitoring</p>
      </div>
      
      <div className="p-6 flex-grow flex flex-col gap-8 overflow-y-auto">
        {/* Mode Selection */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Analysis Mode</h2>
          <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
            <button 
              className={`flex-1 py-2 text-sm rounded-md transition-all font-medium ${mode === 'baseline' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setMode('baseline')}
            >
              Baseline Map
            </button>
            <button 
              className={`flex-1 py-2 text-sm rounded-md transition-all font-medium ${mode === 'change' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setMode('change')}
            >
              Change Map
            </button>
            <button 
              className={`flex-1 py-2 text-sm rounded-md transition-all font-medium ${(mode === 'custom' && customScanUrl) ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white disabled:opacity-50'}`}
              onClick={() => { if(customScanUrl) setMode('custom'); }}
              disabled={!customScanUrl}
            >
              Custom
            </button>
          </div>
        </div>

        <TimelineControl 
          mode={mode}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedTransition={selectedTransition}
          setSelectedTransition={setSelectedTransition}
        />

        <UploadScan 
          onScanComplete={() => setMode('custom')} 
          setCustomScanUrl={setCustomScanUrl} 
        />

        <Legend mode={mode} />
      </div>
    </div>
  );
};

export default Sidebar;
