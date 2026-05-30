import React, { useRef, useState } from 'react';

const UploadScan = ({ onScanComplete, setCustomScanUrl }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(5);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/inference/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const taskId = data.task_id;
      const jobId = data.job_id;

      const pollInterval = setInterval(async () => {
        try {
          const statusRes = await fetch(`http://localhost:8000/api/inference/status/${taskId}`);
          const statusData = await statusRes.json();
          
          if (statusData.status === "Processing" || statusData.status === "Pending") {
             setProgress(statusData.progress || 10);
          } else if (statusData.status === "Completed") {
             clearInterval(pollInterval);
             setProgress(100);
             setCustomScanUrl(`http://localhost:8000/api/inference/download/${jobId}`);
             onScanComplete();
             setUploading(false);
          } else if (statusData.status === "Failed") {
             clearInterval(pollInterval);
             alert("Inference Failed. Check server logs.");
             setUploading(false);
          }
        } catch (err) {
          console.error("Polling error", err);
        }
      }, 2000);
    } catch (error) {
      console.error("Upload failed", error);
      setUploading(false);
      alert("Failed to connect to backend server.");
    }
  };

  return (
    <div className="mt-6 border-t border-gray-700 pt-6">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Live ML Inference</h2>
      <input 
        type="file" 
        accept=".tif,.tiff" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />
      <button 
        onClick={() => fileInputRef.current.click()}
        disabled={uploading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-lg disabled:opacity-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 h-full bg-blue-400 opacity-20" style={{ width: `${progress}%` }}></div>
        <span className="relative z-10">{uploading ? `Processing Scan... ${progress}%` : "Upload Custom .TIF Scan"}</span>
      </button>
      <p className="text-xs text-gray-500 mt-2 text-center">4-Band Sentinel-2 Surface Reflectance Only</p>
    </div>
  );
};

export default UploadScan;
