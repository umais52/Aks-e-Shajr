// src/data/mockData.js
// ─────────────────────────────────────────────────────────────────────────────
// Mock data for district statistics and model evaluation metrics.
// Replace these with real computed values once final data is ready.
// ─────────────────────────────────────────────────────────────────────────────

export const YEARS = ['2019', '2021', '2023', '2024', '2025', 'Future'];

export const TRANSITIONS = [
  { id: '2019_to_2021', label: '2019 → 2021', file: 'Karachi_Change_2019_to_2021.tif' },
  { id: '2021_to_2023', label: '2021 → 2023', file: 'Karachi_Change_2021_to_2023.tif' },
  { id: '2023_to_2024', label: '2023 → 2024', file: 'Karachi_Change_2023_to_2024.tif' },
  { id: '2024_to_2025', label: '2024 → 2025', file: 'Karachi_Change_2024_to_2025.tif' },
];

export const LAYERS = [
  { id: 'green_cover', label: 'Green Cover Mask' },
  { id: 'ndvi',        label: 'NDVI Heatmap'     },
  { id: 'change',      label: 'Change Detection' },
];

export const DISTRICTS = [
  { id: 'central',    name: 'Karachi Central',   bounds: [[24.88, 66.98], [24.92, 67.04]] },
  { id: 'east',       name: 'Karachi East',       bounds: [[24.87, 67.09], [24.94, 67.22]] },
  { id: 'west',       name: 'Karachi West',       bounds: [[24.82, 66.88], [24.91, 67.01]] },
  { id: 'south',      name: 'Karachi South',      bounds: [[24.82, 67.00], [24.89, 67.08]] },
  { id: 'malir',      name: 'Malir',              bounds: [[24.84, 67.17], [25.00, 67.40]] },
  { id: 'korangi',    name: 'Korangi',            bounds: [[24.80, 67.05], [24.87, 67.18]] },
];

export const DISTRICT_STATS = {
  '2019': [
    { district: 'Central',  green_sqkm: 14.2, barren_sqkm: 72.1, pct_green: 16.5 },
    { district: 'East',     green_sqkm: 31.4, barren_sqkm: 180.3, pct_green: 14.8 },
    { district: 'West',     green_sqkm: 42.7, barren_sqkm: 210.9, pct_green: 16.8 },
    { district: 'South',    green_sqkm: 18.1, barren_sqkm: 82.4,  pct_green: 18.0 },
    { district: 'Malir',    green_sqkm: 89.6, barren_sqkm: 390.1, pct_green: 18.7 },
    { district: 'Korangi',  green_sqkm: 22.3, barren_sqkm: 115.2, pct_green: 16.2 },
  ],
  '2021': [
    { district: 'Central',  green_sqkm: 11.9, barren_sqkm: 74.4, pct_green: 13.8 },
    { district: 'East',     green_sqkm: 27.2, barren_sqkm: 184.5, pct_green: 12.8 },
    { district: 'West',     green_sqkm: 38.1, barren_sqkm: 215.5, pct_green: 15.0 },
    { district: 'South',    green_sqkm: 15.3, barren_sqkm: 85.2, pct_green: 15.2 },
    { district: 'Malir',    green_sqkm: 74.2, barren_sqkm: 405.5, pct_green: 15.5 },
    { district: 'Korangi',  green_sqkm: 19.0, barren_sqkm: 118.5, pct_green: 13.8 },
  ],
  '2023': [
    { district: 'Central',  green_sqkm: 18.7, barren_sqkm: 67.6, pct_green: 21.7 },
    { district: 'East',     green_sqkm: 44.1, barren_sqkm: 167.6, pct_green: 20.8 },
    { district: 'West',     green_sqkm: 61.3, barren_sqkm: 192.3, pct_green: 24.2 },
    { district: 'South',    green_sqkm: 24.6, barren_sqkm: 76.1,  pct_green: 24.4 },
    { district: 'Malir',    green_sqkm: 142.1,barren_sqkm: 337.6, pct_green: 29.6 },
    { district: 'Korangi',  green_sqkm: 35.8, barren_sqkm: 101.7, pct_green: 26.0 },
  ],
  '2024': [
    { district: 'Central',  green_sqkm: 12.4, barren_sqkm: 73.9, pct_green: 14.4 },
    { district: 'East',     green_sqkm: 29.1, barren_sqkm: 182.6, pct_green: 13.7 },
    { district: 'West',     green_sqkm: 40.2, barren_sqkm: 213.4, pct_green: 15.8 },
    { district: 'South',    green_sqkm: 16.4, barren_sqkm: 84.3, pct_green: 16.3 },
    { district: 'Malir',    green_sqkm: 81.0, barren_sqkm: 398.7, pct_green: 16.9 },
    { district: 'Korangi',  green_sqkm: 20.2, barren_sqkm: 117.3, pct_green: 14.7 },
  ],
  '2025': [
    { district: 'Central',  green_sqkm: 11.1, barren_sqkm: 75.2, pct_green: 12.9 },
    { district: 'East',     green_sqkm: 26.0, barren_sqkm: 185.7, pct_green: 12.3 },
    { district: 'West',     green_sqkm: 37.4, barren_sqkm: 216.2, pct_green: 14.7 },
    { district: 'South',    green_sqkm: 14.8, barren_sqkm: 85.9, pct_green: 14.7 },
    { district: 'Malir',    green_sqkm: 72.1, barren_sqkm: 407.6, pct_green: 15.0 },
    { district: 'Korangi',  green_sqkm: 18.6, barren_sqkm: 118.9, pct_green: 13.5 },
  ],
  'Future': [
    { district: 'Central',  green_sqkm: 9.4,  barren_sqkm: 76.9, pct_green: 10.9 },
    { district: 'East',     green_sqkm: 21.3, barren_sqkm: 190.4, pct_green: 10.1 },
    { district: 'West',     green_sqkm: 31.8, barren_sqkm: 221.8, pct_green: 12.5 },
    { district: 'South',    green_sqkm: 12.1, barren_sqkm: 88.6, pct_green: 12.0 },
    { district: 'Malir',    green_sqkm: 60.4, barren_sqkm: 419.3, pct_green: 12.6 },
    { district: 'Korangi',  green_sqkm: 15.9, barren_sqkm: 121.6, pct_green: 11.6 },
  ],
};

export const CITY_TOTALS = {
  '2019':   { total_green: 218.3, total_area: 3780, pct: 5.77 },
  '2021':   { total_green: 185.7, total_area: 3780, pct: 4.91 },
  '2023':   { total_green: 326.6, total_area: 3780, pct: 8.64 },
  '2024':   { total_green: 199.3, total_area: 3780, pct: 5.27 },
  '2025':   { total_green: 179.9, total_area: 3780, pct: 4.76 },
  'Future': { total_green: 150.9, total_area: 3780, pct: 3.99 },
};

export const TRANSITION_CONTEXT = {
  '2019_to_2021': {
    title: '2018–2019 Drought Impact',
    badge: 'Net Loss',
    badgeColor: 'text-red-400 bg-red-900/40',
    delta: '-14.5%',
    deltaColor: 'text-red-400',
    body: `The 2018–2019 period was marked by a severe rainfall deficit across Sindh. The Karachi metropolitan area experienced below-average monsoon precipitation for two consecutive years, driving significant die-off in both urban tree canopy and peri-urban agricultural zones. Our U-Net model detected a net reduction of approximately 32.6 km² in vegetated pixels, concentrated predominantly in the Malir and Lyari river corridors where seasonal groundwater recharge failed to materialize.`,
  },
  '2021_to_2023': {
    title: '2022 Super-Flood Ephemeral Spike',
    badge: 'Anomalous Gain',
    badgeColor: 'text-blue-400 bg-blue-900/40',
    delta: '+75.9%',
    deltaColor: 'text-blue-400',
    body: `The catastrophic 2022 monsoon season — which inundated 33% of Pakistan's landmass — triggered an extraordinary, short-lived explosion of ephemeral vegetation across Karachi's floodplains. Captured in the 2023 imagery, our model detected a +140.9 km² surge in green pixels, primarily comprised of fast-growing C4 grasses and pioneer riparian species. This classification is annotated as ecologically ephemeral; it does not represent structural canopy recovery and subsequently collapsed by 2024.`,
  },
  '2023_to_2024': {
    title: 'Post-Flood Arid Correction & Die-Off',
    badge: 'Rapid Die-Off',
    badgeColor: 'text-orange-400 bg-orange-900/40',
    delta: '-39.0%',
    deltaColor: 'text-orange-400',
    body: `As soil moisture from the 2022 super-flood depleted and the 2023–2024 dry season intensified, the ephemeral vegetation detected in 2023 rapidly senesced. Our change detection model mapped this collapse as a large-scale contiguous Loss zone across the eastern districts. The 2024 baseline represents a return to a slightly degraded version of the pre-drought equilibrium, indicating that structural canopy — trees and perennial shrubs — had continued its long-term decline independent of the flood event.`,
  },
  '2024_to_2025': {
    title: '2024–2025 Continued Aridification',
    badge: 'Accelerating Loss',
    badgeColor: 'text-red-400 bg-red-900/40',
    delta: '-9.7%',
    deltaColor: 'text-red-400',
    body: `The 2024–2025 transition reflects the continuation of the underlying structural deficit. With no significant monsoon anomaly, the model tracked a further reduction in green cover, consistent with long-term urban heat island intensification, land-use conversion, and insufficient municipal tree-planting interventions to offset natural attrition rates. The Korangi industrial corridor showed the highest proportional loss.`,
  },
};

export const MODEL_METRICS = [
  { dataset: '2019 Val', accuracy: 0.958, precision: 0.884, recall: 0.870, f1: 0.877, iou: 0.781 },
  { dataset: '2021 Val', accuracy: 0.960, precision: 0.873, recall: 0.855, f1: 0.864, iou: 0.761 },
  { dataset: '2023 Val', accuracy: 0.950, precision: 0.911, recall: 0.890, f1: 0.900, iou: 0.819 },
  { dataset: '2024 Val', accuracy: 0.960, precision: 0.879, recall: 0.862, f1: 0.870, iou: 0.771 },
  { dataset: '2025 Val', accuracy: 0.961, precision: 0.872, recall: 0.853, f1: 0.863, iou: 0.758 },
];

export const CONFUSION_MATRIX = [
  { label: '2019', tp: 14820, fp: 1943, fn: 2218, tn: 81019 },
  { label: '2021', tp: 12640, fp: 1832, fn: 2140, tn: 83388 },
  { label: '2023', tp: 22817, fp: 2241, fn: 2807, tn: 72135 },
  { label: '2024', tp: 13509, fp: 1861, fn: 2162, tn: 82468 },
  { label: '2025', tp: 12180, fp: 1784, fn: 2097, tn: 83939 },
];

export const PIPELINE_STEPS = [
  {
    icon: 'Satellite',
    title: 'Sentinel-2 L2A Acquisition',
    desc: 'Multi-temporal 4-band surface reflectance imagery (B02, B03, B04, B08) sourced from the ESA Copernicus hub at 10m GSD, cloud-filtered to < 5% coverage over the Karachi administrative boundary.',
  },
  {
    icon: 'Globe',
    title: 'GEE Pre-Processing',
    desc: 'Google Earth Engine scripts applied atmospheric correction (Sen2Cor), median-composite mosaicking per year, and export of 115-megapixel city-wide GeoTIFF grids cropped to the Karachi shapefile.',
  },
  {
    icon: 'Layers',
    title: 'Sliding Window Annotation',
    desc: 'City-wide rasters were tiled into 256×256 pixel patches using rasterio. Each patch received binary labels (Vegetation=1, Barren=0) derived from thresholded NDVI (> 0.2) as the ground-truth mask.',
  },
  {
    icon: 'Cpu',
    title: 'U-Net Training (Colab TPU)',
    desc: 'A PyTorch U-Net with a frozen ResNet-34 encoder trained on 28,000+ patch pairs using an Extreme Hybrid Loss (Focal Loss + Dice Loss) to address the severe class imbalance inherent in arid urban landscapes.',
  },
  {
    icon: 'Map',
    title: 'Full-City Inference & Georeferencing',
    desc: 'The trained model performed sliding-window inference across the entire 3,800 km² study area. Edge patches were handled with dynamic reflection padding. Output binary masks were georeferenced back to WGS-84 and exported as Cloud-Optimized GeoTIFFs.',
  },
];
