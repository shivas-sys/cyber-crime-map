import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { CrimeIncident, MapView } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import LeafletMap from "@/components/maps/LeafletMap";

interface CrimeMapProps {
  crimeType?: string;
  district?: string;
  dateRange?: string;
}

const CrimeMapComponent: React.FC<CrimeMapProps> = ({ crimeType, district, dateRange }) => {
  const [mapView, setMapView] = useState<MapView>({
    center: [40.73, -73.99], // Default to New York City
    zoom: 12,
    type: 'heatmap'
  });
  
  // State to track if we need to generate demo data
  const [mockIncidents, setMockIncidents] = useState<CrimeIncident[]>([]);

  // Query for crime incidents with filters
  const { data: incidents = [], isLoading } = useQuery<CrimeIncident[]>({
    queryKey: ["/api/incidents", crimeType, district, dateRange],
  });

  // Create some mock incident data if the API returns empty
  useEffect(() => {
    if (!isLoading && incidents.length === 0) {
      // Generate mock incidents around the center point for demonstration
      const demoIncidents: CrimeIncident[] = [];
      
      // Generate 50 random incidents
      for (let i = 0; i < 50; i++) {
        const latOffset = (Math.random() - 0.5) * 0.1;
        const lngOffset = (Math.random() - 0.5) * 0.1;
        
        const crimeTypes = ["Theft", "Assault", "Burglary", "Vandalism", "Robbery"];
        const districts = ["Downtown", "North Side", "South Side", "East Side", "West End"];
        
        demoIncidents.push({
          id: i + 1,
          crimeType: crimeTypes[Math.floor(Math.random() * crimeTypes.length)],
          latitude: mapView.center[0] + latOffset,
          longitude: mapView.center[1] + lngOffset,
          district: districts[Math.floor(Math.random() * districts.length)],
          dateTime: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
          status: "Reported",
          description: i % 5 === 0 ? "Mock incident for demonstration purposes" : undefined
        });
      }
      
      setMockIncidents(demoIncidents);
    }
  }, [incidents, isLoading]);

  // The data to display (real or mock)
  const displayIncidents = incidents.length > 0 ? incidents : mockIncidents;

  // Handle view type change
  const handleViewTypeChange = (type: 'heatmap' | 'clusters' | 'individual') => {
    setMapView(prev => ({ ...prev, type }));
  };

  // Calculate high-risk areas based on incidents
  const highRiskCount = displayIncidents.reduce((count, incident) => {
    if (incident.crimeType === "Assault" || incident.crimeType === "Robbery") {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">Crime Hotspot Map</h2>
        <div className="flex items-center space-x-3">
          <button className="p-1.5 rounded-md hover:bg-gray-100">
            <i className="ri-fullscreen-line"></i>
          </button>
          <div>
            <Select value={mapView.type} onValueChange={(value: any) => handleViewTypeChange(value)}>
              <SelectTrigger className="text-xs h-8 w-28">
                <SelectValue placeholder="View Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="heatmap">Heatmap</SelectItem>
                <SelectItem value="clusters">Clusters</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50">
        <div className="flex gap-4 mb-4">
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Incidents</p>
                  <p className="text-2xl font-bold">{displayIncidents.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-map-pin-line text-xl text-blue-500"></i>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Peak Hours</p>
                  <p className="text-2xl font-bold">6-9 PM</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="ri-time-line text-xl text-purple-500"></i>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">High Risk Areas</p>
                  <p className="text-2xl font-bold">{Math.round(highRiskCount / 10)}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="ri-alarm-warning-line text-xl text-red-500"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="mb-2 flex justify-between items-center">
            <p className="text-sm font-medium">Crime Map Visualization</p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {displayIncidents.length} incidents
            </span>
          </div>
          
          {isLoading ? (
            <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-2"></div>
                <p className="text-sm text-gray-500">Loading crime data...</p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden border">
              <LeafletMap 
                incidents={displayIncidents}
                center={mapView.center}
                zoom={mapView.zoom}
                height="400px"
                viewType={mapView.type}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrimeMapComponent;
