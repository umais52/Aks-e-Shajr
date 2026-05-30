import os
import rasterio
import numpy as np

# 1. Generate Future Green Cover by degrading 2025
base_file = 'public/data/Karachi_Green_Cover_2025.tif'
future_file = 'public/data/Karachi_Green_Cover_Future.tif'
future_ndvi = 'public/data/Karachi_NDVI_Future.tif'

if os.path.exists(base_file):
    with rasterio.open(base_file) as src:
        meta = src.meta.copy()
        data = src.read(1)
        
        # Degrade: randomly turn 15% of green pixels to barren
        mask = data == 1
        loss_chance = np.random.rand(*data.shape) < 0.15
        future_data = data.copy()
        future_data[mask & loss_chance] = 0
        
        with rasterio.open(future_file, 'w', **meta) as dst:
            dst.write(future_data, 1)
        print("Generated Future Green Cover")

    # 2. Generate Future NDVI
    with rasterio.open(future_file) as src:
        meta = src.meta.copy()
        meta.update(dtype=rasterio.float32)
        data = src.read(1)
        
        noise_green = np.random.uniform(0.5, 0.9, data.shape)
        noise_barren = np.random.uniform(0.0, 0.3, data.shape)
        ndvi_data = np.where(data == 1, noise_green, noise_barren).astype(np.float32)
        
        with rasterio.open(future_ndvi, 'w', **meta) as dst:
            dst.write(ndvi_data, 1)
        print("Generated Future NDVI")
