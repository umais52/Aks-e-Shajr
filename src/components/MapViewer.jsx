import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import parseGeoraster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

// Inner component: lives inside MapContainer so it can use useMap()
const GeoRasterOverlay = ({ mode, selectedYear, selectedTransition, customScanUrl, setLoading }) => {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadGeoTiff = async () => {
      setLoading(true);

      // Cleanup previous layer before adding a new one
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }

      // Determine the URL to fetch based on current mode
      let url = '';
      if (mode === 'baseline') {
        url = `/data/Karachi_Green_Cover_${selectedYear}.tif`;
      } else if (mode === 'change') {
        url = `/data/Karachi_Change_${selectedTransition}.tif`;
      } else if (mode === 'custom' && customScanUrl) {
        url = customScanUrl;
      }

      if (!url) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`GeoTIFF not found at: ${url}`);
          setLoading(false);
          return;
        }

        const arrayBuffer = await response.arrayBuffer();
        const georaster = await parseGeoraster(arrayBuffer);

        if (!isMounted) return;

        // Colorize pixels based on the active mode
        const layer = new GeoRasterLayer({
          georaster: georaster,
          opacity: 0.85,
          pixelValuesToColorFn: (values) => {
            const pixel = values[0];
            if (mode === 'baseline' || mode === 'custom') {
              if (pixel === 1) return '#22c55e'; // Bright Green = Vegetation
              return null;                        // Transparent = Barren
            } else {
              if (pixel === 1)  return '#3b82f6'; // Blue  = Gain
              if (pixel === -1) return '#ef4444'; // Red   = Loss
              return null;                        // Transparent = Stable
            }
          },
          resolution: 256,
        });

        layer.addTo(map);
        layerRef.current = layer;

        // Auto-fit the map to the loaded layer bounds
        try {
          map.fitBounds(layer.getBounds());
        } catch (_) { /* ignore if no bounds */ }

      } catch (error) {
        console.error('Error loading GeoTIFF:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadGeoTiff();

    return () => {
      isMounted = false;
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  // customScanUrl MUST be in the dep array so switching to 'custom' mode re-triggers load
  }, [map, mode, selectedYear, selectedTransition, customScanUrl, setLoading]);

  return null;
};

const MapViewer = ({ mode, selectedYear, selectedTransition, customScanUrl }) => {
  const [loading, setLoading] = useState(false);
  const position = [24.8607, 67.0011]; // Karachi center

  return (
    <div className="flex-grow relative h-full w-full z-0">

      {/* Loading overlay — shown while GeoTIFF is being fetched/parsed */}
      {loading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-2xl">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-200 font-medium text-sm tracking-wide">
              {mode === 'custom' ? 'Rendering ML Prediction...' : 'Parsing GeoTIFF Data...'}
            </p>
          </div>
        </div>
      )}

      <MapContainer
        center={position}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {/* Pass ALL required props — customScanUrl was previously missing here */}
        <GeoRasterOverlay
          mode={mode}
          selectedYear={selectedYear}
          selectedTransition={selectedTransition}
          customScanUrl={customScanUrl}
          setLoading={setLoading}
        />
      </MapContainer>
    </div>
  );
};

export default MapViewer;
