import React, { useState } from "react";
import Header from "@/components/layout/Header";
import FilterControls from "@/components/filters/FilterControls";
import CrimeMapComponent from "@/components/dashboard/CrimeMapComponent";
import { FilterOptions } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CrimeMap: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: "30days",
    crimeType: "all",
    district: "all"
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Crime Map Analysis" />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Filters */}
          <FilterControls 
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
          
          {/* Map and controls */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              {/* Map Component - larger size for dedicated page */}
              <div className="rounded-lg shadow bg-white p-4 border" style={{ height: "70vh" }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Crime Map Analysis</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {filters.crimeType !== "all" ? filters.crimeType : "All crimes"}
                    </span>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      {filters.district !== "all" ? filters.district : "All districts"}
                    </span>
                  </div>
                </div>
                <div className="h-full">
                  <CrimeMapComponent 
                    crimeType={filters.crimeType !== "all" ? filters.crimeType : undefined}
                    district={filters.district !== "all" ? filters.district : undefined}
                    dateRange={filters.dateRange as string}
                  />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Map Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="view">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="view">View</TabsTrigger>
                      <TabsTrigger value="layers">Layers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="view" className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Map Style</h3>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1 text-xs bg-primary text-white rounded">
                            Standard
                          </button>
                          <button className="px-3 py-1 text-xs bg-gray-200 rounded">
                            Satellite
                          </button>
                          <button className="px-3 py-1 text-xs bg-gray-200 rounded">
                            Dark
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Visualization</h3>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1 text-xs bg-primary text-white rounded">
                            Heatmap
                          </button>
                          <button className="px-3 py-1 text-xs bg-gray-200 rounded">
                            Points
                          </button>
                          <button className="px-3 py-1 text-xs bg-gray-200 rounded">
                            Clusters
                          </button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="layers" className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm">Crime Incidents</span>
                          <input type="checkbox" checked readOnly />
                        </div>
                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm">District Boundaries</span>
                          <input type="checkbox" checked readOnly />
                        </div>
                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm">Police Stations</span>
                          <input type="checkbox" readOnly />
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm">Schools</span>
                          <input type="checkbox" readOnly />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Area Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Selected Area</p>
                    <p className="text-sm text-gray-600">Downtown</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Total Incidents</p>
                    <p className="text-2xl font-bold">486</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Risk Level</p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <p className="text-sm text-red-600 font-medium">High</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Trend</p>
                    <p className="text-sm text-red-600">+12% from last month</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CrimeMap;
