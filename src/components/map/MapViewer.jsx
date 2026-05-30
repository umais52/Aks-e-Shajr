// src/components/map/MapViewer.jsx
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ── Strict Data Tile Overlay ───────────────────────────────────────────────────
const DataTileOverlay = ({ tileUrl }) => {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    if (!tileUrl) return;

    // Strict cleanup: guarantee old layer is removed before creating new one
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    const layer = L.tileLayer(tileUrl, {
      opacity: 0.85,
      zIndex: 10,
      tms: false,
    });

    layer.addTo(map);
    layerRef.current = layer;

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [tileUrl, map]);

  return null;
};

// ── District bounds pan ───────────────────────────────────────────────────────
const DistrictPanner = ({ bounds }) => {
  const map = useMap();
  useEffect(() => { if (bounds) map.fitBounds(bounds, { padding: [40, 40] }); }, [bounds, map]);
  return null;
};

// ── Main export ───────────────────────────────────────────────────────────────
const MapViewer = ({ tileUrl, districtBounds }) => {
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[24.8607, 67.0011]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          zIndex={1}
        />
        <DataTileOverlay tileUrl={tileUrl} />
        <DistrictPanner bounds={districtBounds} />
      </MapContainer>
    </div>
  );
};

export default MapViewer;
