import React, { useState } from "react";
import Header from "@/components/layout/Header";
import FilterControls from "@/components/filters/FilterControls";
import CrimeMapComponent from "@/components/dashboard/CrimeMapComponent";
import StatisticsPanel from "@/components/dashboard/StatisticsPanel";
import BehavioralPanel from "@/components/dashboard/BehavioralPanel";
import DataImportPanel from "@/components/dashboard/DataImportPanel";
import { FilterOptions } from "@/lib/types";

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: "7days",
    crimeType: "all",
    district: "all"
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Crime Hotspot Dashboard" />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Filters and controls */}
          <FilterControls 
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />

          {/* Map and Stats grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Crime Map */}
            <div className="lg:col-span-2">
              <CrimeMapComponent 
                crimeType={filters.crimeType !== "all" ? filters.crimeType : undefined}
                district={filters.district !== "all" ? filters.district : undefined}
                dateRange={filters.dateRange as string}
              />
            </div>
            
            {/* Statistics Panel */}
            <StatisticsPanel 
              crimeType={filters.crimeType !== "all" ? filters.crimeType : undefined}
              district={filters.district !== "all" ? filters.district : undefined}
              dateRange={filters.dateRange as string}
            />
          </div>
          
          {/* Behavioral Analysis & Data Import sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Behavioral Analysis Panel */}
            <BehavioralPanel 
              crimeType={filters.crimeType !== "all" ? filters.crimeType : undefined}
              district={filters.district !== "all" ? filters.district : undefined}
              dateRange={filters.dateRange as string}
            />
            
            {/* Data Import Panel */}
            <DataImportPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
