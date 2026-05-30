import os
import rasterio
import numpy as np

years = ['2019', '2021', '2023', '2024', '2025']
input_dir = 'public/data/'

for year in years:
    gc_file = os.path.join(input_dir, f'Karachi_Green_Cover_{year}.tif')
    ndvi_file = os.path.join(input_dir, f'Karachi_NDVI_{year}.tif')
    
    if os.path.exists(gc_file):
        with rasterio.open(gc_file) as src:
            meta = src.meta.copy()
            meta.update(dtype=rasterio.float32)
            
            data = src.read(1)
            # Create mock NDVI: 
            # where data == 1 (green), random between 0.5 and 0.9
            # where data == 0 (barren), random between 0.0 and 0.3
            noise_green = np.random.uniform(0.5, 0.9, data.shape)
            noise_barren = np.random.uniform(0.0, 0.3, data.shape)
            
            ndvi_data = np.where(data == 1, noise_green, noise_barren).astype(np.float32)
            
            with rasterio.open(ndvi_file, 'w', **meta) as dst:
                dst.write(ndvi_data, 1)
        print(f"Generated {ndvi_file}")
