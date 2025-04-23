import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { FilterOptions } from "@/lib/types";

interface FilterControlsProps {
  onFilterChange: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const FilterControls: React.FC<FilterControlsProps> = ({ onFilterChange, currentFilters }) => {
  const { data: districts = [] } = useQuery({
    queryKey: ["/api/districts"],
  });

  const { data: crimeTypes = [] } = useQuery({
    queryKey: ["/api/crime-types"],
  });

  const dateRangeOptions = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "90days", label: "Last 90 days" },
    { value: "custom", label: "Custom range" }
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...currentFilters,
      [key]: value
    });
  };

  const handleRefresh = () => {
    // Trigger a refresh of the data
    onFilterChange({ ...currentFilters });
  };

  const handleSaveView = () => {
    // Save current view settings
    console.log("Saving view with filters:", currentFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="sm:flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-4 mb-4 sm:mb-0">
          <div>
            <Label className="text-sm font-medium text-gray-700 block mb-1">Date Range</Label>
            <Select 
              value={currentFilters.dateRange as string} 
              onValueChange={(value) => handleFilterChange("dateRange", value)}
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700 block mb-1">Crime Type</Label>
            <Select 
              value={currentFilters.crimeType} 
              onValueChange={(value) => handleFilterChange("crimeType", value)}
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Select crime type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All crimes</SelectItem>
                {crimeTypes.map((type: any) => (
                  <SelectItem key={type.id} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700 block mb-1">District</Label>
            <Select 
              value={currentFilters.district} 
              onValueChange={(value) => handleFilterChange("district", value)}
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All districts</SelectItem>
                {districts.map((district: any) => (
                  <SelectItem key={district.id} value={district.name}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleRefresh}>
            <i className="ri-refresh-line mr-2"></i> Refresh
          </Button>
          <Button onClick={handleSaveView}>
            <i className="ri-save-line mr-2"></i> Save View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
