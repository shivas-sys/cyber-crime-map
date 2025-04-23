import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CrimeIncident } from '@/lib/types';

// Fix Leaflet default icon issue
const fixLeafletIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

interface LeafletMapProps {
  incidents: CrimeIncident[];
  center: [number, number];
  zoom: number;
  height?: string;
  viewType: 'heatmap' | 'clusters' | 'individual';
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  incidents,
  center,
  zoom,
  height = '500px',
  viewType = 'heatmap'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const mapInitializedRef = useRef(false);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInitializedRef.current) {
      fixLeafletIcon();
      
      // Create map
      const map = L.map(mapRef.current).setView(center, zoom);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Create markers layer group
      const markersLayer = L.layerGroup().addTo(map);
      
      // Store references
      leafletMapRef.current = map;
      markersLayerRef.current = markersLayer;
      mapInitializedRef.current = true;
      
      // Cleanup on unmount
      return () => {
        if (map) {
          map.remove();
          leafletMapRef.current = null;
          markersLayerRef.current = null;
          mapInitializedRef.current = false;
        }
      };
    }
  }, []);
  
  // Update map center and zoom if props change
  useEffect(() => {
    if (leafletMapRef.current) {
      leafletMapRef.current.setView(center, zoom);
    }
  }, [center, zoom]);
  
  // Update markers when incidents or viewType changes
  useEffect(() => {
    if (!leafletMapRef.current || !markersLayerRef.current) return;
    
    // Clear previous markers
    markersLayerRef.current.clearLayers();
    
    if (viewType === 'individual') {
      // Individual markers
      incidents.forEach(incident => {
        const marker = L.marker([incident.latitude, incident.longitude]);
        const popupContent = `
          <div>
            <h3 style="font-weight: 600; margin-bottom: 4px;">${incident.crimeType}</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 4px;">
              ${new Date(incident.dateTime).toLocaleString()}
            </p>
            ${incident.description ? `<p style="font-size: 14px; margin-top: 4px;">${incident.description}</p>` : ''}
            <p style="font-size: 12px; color: #666; margin-top: 4px;">${incident.district}</p>
          </div>
        `;
        marker.bindPopup(popupContent);
        marker.addTo(markersLayerRef.current!);
      });
    } else if (viewType === 'clusters') {
      // Create clusters (simplified version)
      const clusters: Record<string, {lat: number, lng: number, count: number}> = {};
      
      incidents.forEach(incident => {
        // Simple clustering by rounding coordinates
        const key = `${Math.round(incident.latitude * 100) / 100},${Math.round(incident.longitude * 100) / 100}`;
        
        if (!clusters[key]) {
          clusters[key] = {
            lat: incident.latitude,
            lng: incident.longitude,
            count: 1
          };
        } else {
          clusters[key].count++;
        }
      });
      
      // Add cluster markers
      Object.values(clusters).forEach(cluster => {
        // Create sizing based on count (simple scaling)
        const size = Math.min(20 + cluster.count, 50);
        
        // Create circle marker for cluster
        const marker = L.circleMarker([cluster.lat, cluster.lng], {
          radius: size / 2,
          fillColor: '#3b82f6',
          color: '#2563eb',
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.6
        });
        
        marker.bindPopup(`<b>${cluster.count} incidents</b> in this area`);
        marker.addTo(markersLayerRef.current!);
      });
    } else if (viewType === 'heatmap') {
      // Simple visual heatmap for demonstration (not true heatmap)
      incidents.forEach(incident => {
        const circle = L.circle([incident.latitude, incident.longitude], {
          radius: 100,
          fillColor: '#ef4444',
          fillOpacity: 0.3,
          stroke: false
        });
        circle.addTo(markersLayerRef.current!);
      });
    }
  }, [incidents, viewType]);
  
  return (
    <div>
      <div ref={mapRef} style={{ height, width: '100%' }}></div>
      
      {/* Map legend */}
      <div className="mt-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium mb-2">Crime Intensity</span>
          <div className="bg-gradient-to-r from-green-500 via-yellow-400 to-red-600 h-2 w-64 rounded-full"></div>
          <div className="flex justify-between w-64 mt-1">
            <span className="text-xs text-green-600">Low</span>
            <span className="text-xs text-yellow-500">Medium</span>
            <span className="text-xs text-red-600">High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;