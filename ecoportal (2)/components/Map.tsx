import React, { useEffect, useRef } from 'react';
import { ACTIVITIES } from '../constants';

// We need to declare L globally to avoid TS errors since we loaded it via CDN
declare global {
  interface Window {
    L: any;
  }
}

export const Map: React.FC<{ id: string }> = ({ id }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current || !window.L) return;

    try {
      const L = window.L;
      const center = [19.0760, 72.8777]; // Mumbai roughly
      const map = L.map(mapContainerRef.current).setView(center, 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Heatmap points
      const heatPoints = ACTIVITIES
        .filter(a => a.lat && a.lon)
        .map(a => [a.lat, a.lon, Math.min(1, (a.ep || 10) / 80)]);

      // Add dummy points for density
      for(let i=0; i<30; i++) {
        heatPoints.push([19.0 + Math.random()*0.2, 72.8 + Math.random()*0.2, 0.5]);
      }

      if (L.heatLayer) {
        L.heatLayer(heatPoints, {
          radius: 25,
          blur: 20, 
          gradient: {0.2: '#bff0d6', 0.5: '#f39c12', 0.9: '#c0392b'}
        }).addTo(map);
      }

      mapInstanceRef.current = map;
    } catch (e) {
      console.error("Map init failed", e);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="w-full h-[300px] rounded-xl z-0" />;
};
