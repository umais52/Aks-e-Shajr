import rasterio
import numpy as np

with rasterio.open('public/data/Karachi_Change_2024_to_2025.tif') as src:
    data = src.read(1)
    print('Unique values:', np.unique(data))
