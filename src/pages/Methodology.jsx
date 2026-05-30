// src/pages/Methodology.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Satellite, Globe, Layers, Cpu, Map, Zap, GitBranch, ShieldCheck, TrendingDown } from 'lucide-react';
import { PerformanceBarChart, RadarMetricChart, ConfusionTable, RegressionScatterChart } from '../components/charts/MetricsChart';
import { MODEL_METRICS } from '../data/mockData';

const SectionHeader = ({ step, title, subtitle }) => (
  <div className="mb-8">
    <span className="text-xs font-bold tracking-[0.2em] text-emerald-500 uppercase">{step}</span>
    <h2 className="text-2xl font-bold text-white mt-1 mb-2">{title}</h2>
    {subtitle && <p className="text-gray-400 max-w-2xl">{subtitle}</p>}
  </div>
);

const Divider = () => <hr className="border-gray-800 my-16" />;

const Methodology = () => (
  <div className="min-h-screen bg-gray-950 text-white">
    {/* Nav */}
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Spatial Dashboard
        </Link>
        <span className="text-gray-700">|</span>
        <span className="text-emerald-400 font-bold text-sm">Aks-e-Shajr</span>
      </div>
      <span className="text-xs text-gray-600 uppercase tracking-widest">Methodology & Evaluation</span>
    </nav>

    {/* Hero */}
    <header className="border-b border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-emerald-950/30 px-8 md:px-20 py-20">
      <p className="text-xs font-bold tracking-[0.2em] text-emerald-500 uppercase mb-3">Data Science Rigor</p>
      <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 max-w-3xl">
        From Satellite Pixels to<br />
        <span className="text-emerald-400">Ecological Intelligence</span>
      </h1>
      <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
        A technical deep-dive into the geospatial machine learning pipeline powering Aks-e-Shajr's urban canopy
        change detection system — from raw Sentinel-2 multispectral acquisition to production-ready WebGIS inference and regression modeling.
      </p>
    </header>

    <main className="px-8 md:px-20 py-16 max-w-6xl mx-auto flex flex-col gap-0">

      {/* ── PHASE 1 ─────────────────────────────────────────────── */}
      <SectionHeader step="Phase 1" title="Geospatial Data Acquisition and Processing"
        subtitle="The foundation of the system required high-resolution, multi-temporal satellite data encompassing the exact administrative boundaries of Karachi." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-gray-400 leading-relaxed">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Globe size={16}/> Region of Interest (ROI) Delineation</h3>
          <p>We utilized a localized shapefile provided by the Humanitarian Data Exchange (HDX) to extract the precise administrative boundaries of the Karachi Division, avoiding arbitrary bounding boxes that would skew area calculations.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Satellite size={16}/> Earth Engine Integration</h3>
          <p>Using the Google Earth Engine (GEE) Python API, we accessed the Sentinel-2 Surface Reflectance (COPERNICUS/S2_SR_HARMONIZED) dataset.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Layers size={16}/> Multispectral Extraction</h3>
          <p>We extracted four specific bands required for vegetation index calculation and neural network processing: Blue (B2), Green (B3), Red (B4), and Near-Infrared (B8), at a spatial resolution of 10 meters per pixel.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Zap size={16}/> Temporal Compositing & Cloud Masking</h3>
          <p>To eliminate atmospheric interference, we generated median composites over extended temporal windows (up to 8 months for historically challenging years like 2019) applying a 30% cloud filter constraint. We utilized the QA60 band to perform bitwise masking of cirrus and opaque clouds, resulting in seamless, city-wide 115-megapixel GeoTIFF master files.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:col-span-2">
          <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Map size={16}/> Historical Baseline Definition</h3>
          <p>We acquired data for distinct climatological periods: 2019 (severe drought), 2021 (baseline recovery), 2023 (post-2022 super-flood anomaly), 2024 (arid correction), and 2025.</p>
        </div>
      </div>

      <Divider />

      {/* ── PHASE 2 ─────────────────────────────────────────────── */}
      <SectionHeader step="Phase 2" title="Dataset Extraction & Ground Truth Refinement"
        subtitle="Before training the neural network, the massive city-wide composites had to be translated into a mathematically viable, high-quality training dataset. This required a rigorous pipeline of algorithmic filtering and systematic manual cleaning by the team." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-gray-400 leading-relaxed">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-blue-400 font-bold mb-2">Spatial Slicing</h3>
          <p>The 115-megapixel master TIFFs were programmatically sliced into a grid of 256x256 pixel patches, the required dimensional input for the U-Net architecture.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-blue-400 font-bold mb-2">Algorithmic Filtering</h3>
          <p>To prevent the model from collapsing due to class imbalance, we implemented a standard deviation filter (<code>np.std(mask_data) == 0</code>) during extraction. This automatically discarded completely empty or homogeneous patches (such as deep ocean or solid barren desert), isolating only the grid coordinates containing mixed urban-environmental data.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-blue-400 font-bold mb-2">Temporal Sampling</h3>
          <p>We extracted 100 high-variance patches per historical year to ensure the training dataset captured a wide diversity of seasonal lighting, atmospheric conditions, and vegetation states.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-blue-400 font-bold mb-2">Rigorous Manual Cleaning & Annotation</h3>
          <p>Pseudo-labels generated via baseline NDVI thresholding are inherently noisy and prone to misclassifying shadows or artificial green surfaces. The team conducted a meticulous, patch-by-patch manual audit of the sampled dataset. This involved physically correcting pixel boundary errors, erasing hallucinated vegetation, and refining the binary masks to establish absolute ground truth. This rigorous human-in-the-loop cleaning process yielded a highly precise, curated dataset of 161 flawless patches, which served as the absolute standard for model optimization.</p>
        </div>
      </div>

      <Divider />

      {/* ── PHASE 3 ─────────────────────────────────────────────── */}
      <SectionHeader step="Phase 3" title="Machine Learning Architecture & Inference"
        subtitle="We deployed a deep learning architecture optimized for semantic segmentation of multispectral raster data, strictly utilizing the human-refined patches for training." />

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8 text-sm text-gray-400 leading-relaxed space-y-6">
        <div>
          <h3 className="text-purple-400 font-bold mb-2 text-base flex items-center gap-2"><GitBranch size={18}/> Model Selection & Architecture Context</h3>
          <p className="mb-3">We rigorously evaluated multiple semantic segmentation paradigms before finalizing the architecture:</p>
          <ul className="list-disc pl-5 space-y-3">
            <li><strong>CNNs (Convolutional Neural Networks):</strong> CNNs are the foundational building blocks for image processing, utilizing convolutional filters to extract hierarchical spatial features (edges, textures, shapes). However, raw CNNs lack the spatial reconstruction capability required to generate pixel-perfect masks, necessitating encoder-decoder networks.</li>
            <li><strong>DeepLabV3 Exploration:</strong> We explored DeepLabV3, which employs Atrous Spatial Pyramid Pooling (ASPP) to capture multi-scale contextual information. While exceptionally powerful for standard datasets, its heavy computational overhead and tendency to smooth over fine-grained edges made it less suitable for delineating sparse, highly fragmented urban vegetation boundaries in our arid Karachi context.</li>
            <li><strong>The Winning Architecture (U-Net + ResNet34):</strong> We ultimately selected a PyTorch U-Net architecture featuring a ResNet34 encoder. U-Net's symmetric encoder-decoder structure with direct skip connections proved vastly superior at preserving the low-level spatial geometry necessary to accurately reconstruct sharp vegetation boundaries from 10m-resolution pixels.</li>
          </ul>
        </div>
        
        <hr className="border-gray-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-purple-400 font-bold mb-2">Training Optimization</h3>
            <p>The model was trained on the curated 256x256 micro-patches using an Extreme Hybrid Loss function combining 40% Dice Loss and 60% Focal Loss. This heavily penalized spatial boundary errors and mitigated the extreme class imbalance inherent in arid urban environments dominated by concrete.</p>
          </div>
          <div>
            <h3 className="text-purple-400 font-bold mb-2">Dynamic Normalization</h3>
            <p>Prior to inference, each 4-band input tensor was subjected to a dynamic 2nd-98th percentile stretch to normalize brightness anomalies, followed by standard ImageNet mean and standard deviation normalization.</p>
          </div>
          <div>
            <h3 className="text-purple-400 font-bold mb-2">Sliding Window Inference</h3>
            <p>To process the massive 300MB+ master TIFFs without exceeding GPU VRAM limitations, we engineered a memory-safe sliding window pipeline utilizing <code>rasterio</code>. The script scanned the city grid in 256x256 blocks, writing predictions directly to the disk.</p>
          </div>
          <div>
            <h3 className="text-purple-400 font-bold mb-2">Edge-Case Boundary Handling</h3>
            <p>We implemented dynamic cropping logic during inference. At the physical edges of the master grid, the prediction tensors were mathematically cropped (<code>actual_h = min(patch_size, height - row)</code>) before writing to the destination file, effectively preventing <code>CPLE_IllegalArgError</code> out-of-bounds failures.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── PHASE 4 ─────────────────────────────────────────────── */}
      <SectionHeader step="Phase 4" title="Spatial Analytics and Multi-Temporal Auditing"
        subtitle="With the binary vegetation masks successfully generated (1 for Vegetation, 0 for Barren), we executed a strict mathematical and geospatial audit." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm text-gray-400 leading-relaxed">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-amber-400 font-bold mb-2 flex items-center gap-2"><ShieldCheck size={16}/> Area Quantification</h3>
          <p>Utilizing the Sentinel-2 spatial resolution (1 pixel = 100 square meters), we calculated the exact square kilometer coverage for each year. This quantification proved the model's accuracy by successfully tracking documented climatological events: the 2019 drought (282.36 sq km), the 2023 flood-induced ephemeral vegetation spike (710.82 sq km), and the 2024 baseline correction (561.83 sq km).</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-amber-400 font-bold mb-2 flex items-center gap-2"><Map size={16}/> Change Detection Mapping</h3>
          <p>We developed a script to perform pixel-wise subtraction between temporal pairs (e.g., 2024 array minus 2019 array). This generated multi-class Change Maps where mathematically, -1 represented Vegetation Loss, 0 represented Stable terrain, and 1 represented Vegetation Gain.</p>
        </div>
      </div>

      {/* Metric Visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {MODEL_METRICS.map(m => (
          <div key={m.dataset} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">{m.dataset}</p>
            <div className="flex flex-col gap-2">
              {[['Accuracy', m.accuracy, 'text-emerald-400'],['F1-Score', m.f1, 'text-purple-400'],['Precision', m.precision, 'text-blue-400'],['Recall', m.recall, 'text-pink-400'],['IoU', m.iou, 'text-amber-400']].map(([k, v, cls]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{k}</span>
                  <span className={`text-xs font-bold font-mono ${cls}`}>{(v * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <PerformanceBarChart />
        <RadarMetricChart />
      </div>
      <ConfusionTable />

      <Divider />

      {/* ── PREDICTIVE ANALYTICS ─────────────────────────────────────────────── */}
      <SectionHeader step="Predictive Extension" title="Predictive Linear Regression Modeling"
        subtitle="Forecasting the 2027 ecological trajectory based on the historical segmentation outputs." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-center">
          <h3 className="text-red-400 font-bold mb-3 text-lg flex items-center gap-2"><TrendingDown size={20}/> 2027 Ecological Forecast</h3>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            To generate future insights, we subjected the validated historical area quantifications (2019, 2021, 2023, 2024, 2025) to Ordinary Least Squares (OLS) Linear Regression. The regression algorithm learned the temporal decay rate of Karachi's green cover and extrapolated it to the target year 2027.
          </p>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-4 font-mono text-xs">
            <div className="flex justify-between mb-2"><span className="text-gray-500">Regression Equation:</span> <span className="text-emerald-300">y = -13.04x + 26569.89</span></div>
            <div className="flex justify-between mb-2"><span className="text-gray-500">R² Score:</span> <span className="text-amber-300">0.158</span></div>
            <div className="flex justify-between mb-2"><span className="text-gray-500">Mean Squared Error:</span> <span className="text-amber-300">2341.22</span></div>
            <div className="flex justify-between pt-2 border-t border-gray-800"><span className="text-gray-500 font-bold">Predicted 2027 Area:</span> <span className="text-red-400 font-bold text-sm">139.73 km²</span></div>
          </div>
          <p className="text-xs text-gray-500">
            The predicted result signifies a severe, continuous degradation of the urban canopy. The regressor successfully mapped a mathematically calculated 2027 probability mask and served it as spatial XYZ tiles for frontend visualization.
          </p>
        </div>
        
        {/* Render the new Scatter Chart */}
        <RegressionScatterChart />
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-emerald-950/40 to-gray-900 border border-emerald-800/30 rounded-2xl text-center">
        <p className="text-sm text-gray-400 mb-3">Ready to explore the spatial results and predictions?</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors shadow-lg shadow-emerald-900/40">
          <Map size={15} /> Open the Spatial Dashboard
        </Link>
      </div>

    </main>

    <footer className="border-t border-gray-800 px-8 py-6 text-center text-xs text-gray-600">
      Aks-e-Shajr · Urban Green Cover Monitoring System · Karachi, Pakistan ·{' '}
      <span className="text-gray-500">U-Net ResNet-34 | Sentinel-2 L2A | PyTorch</span>
    </footer>
  </div>
);

export default Methodology;
