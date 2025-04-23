import React, { useState } from "react";
import Header from "@/components/layout/Header";
import FilterControls from "@/components/filters/FilterControls";
import { FilterOptions } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarChart from "@/components/charts/BarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const Analytics: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: "30days",
    crimeType: "all",
    district: "all"
  });

  // Mock data for crime by district
  const crimeByDistrict = [
    { name: "Downtown", value: 486 },
    { name: "North Side", value: 327 },
    { name: "South Side", value: 215 },
    { name: "West End", value: 174 },
    { name: "East Side", value: 153 }
  ];

  // Mock data for crime by time
  const crimeByTime = [
    { name: "12am", value: 25 },
    { name: "3am", value: 18 },
    { name: "6am", value: 12 },
    { name: "9am", value: 30 },
    { name: "12pm", value: 54 },
    { name: "3pm", value: 72 },
    { name: "6pm", value: 108 },
    { name: "9pm", value: 90 }
  ];

  // Mock data for crime by type
  const crimeByType = [
    { name: "Theft", value: 486, color: "#2563eb" },
    { name: "Assault", value: 327, color: "#ef4444" },
    { name: "Burglary", value: 215, color: "#f97316" },
    { name: "Vandalism", value: 153, color: "#10b981" },
    { name: "Other", value: 102, color: "#6366f1" }
  ];

  // Mock data for trends
  const trendData = [
    { name: "Jan", Theft: 65, Assault: 42, Burglary: 28 },
    { name: "Feb", Theft: 59, Assault: 38, Burglary: 31 },
    { name: "Mar", Theft: 80, Assault: 43, Burglary: 26 },
    { name: "Apr", Theft: 81, Assault: 45, Burglary: 30 },
    { name: "May", Theft: 76, Assault: 53, Burglary: 34 },
    { name: "Jun", Theft: 84, Assault: 51, Burglary: 29 }
  ];

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Crime Analytics Dashboard" />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Filters */}
          <FilterControls 
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-gray-500 mb-1">Total Incidents</div>
                <div className="text-3xl font-bold">1,283</div>
                <div className="text-xs text-green-600 mt-1">+3% from previous period</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-gray-500 mb-1">Highest Crime Type</div>
                <div className="text-3xl font-bold">Theft</div>
                <div className="text-xs text-red-600 mt-1">38% of all incidents</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-gray-500 mb-1">High Risk Area</div>
                <div className="text-3xl font-bold">Downtown</div>
                <div className="text-xs text-red-600 mt-1">486 incidents</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-gray-500 mb-1">Peak Crime Time</div>
                <div className="text-3xl font-bold">6-9 PM</div>
                <div className="text-xs text-amber-600 mt-1">31% of incidents</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main analytics content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crime by District</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={crimeByDistrict}
                    xAxisDataKey="name"
                    barDataKey="value"
                    height={300}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Time Pattern Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={crimeByTime}
                    xAxisDataKey="name"
                    barDataKey="value"
                    barColor="hsl(var(--secondary))"
                    height={300}
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crime by Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={crimeByType}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {crimeByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Crime Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="line">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="line">Line Chart</TabsTrigger>
                      <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="line" className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={trendData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="Theft" stroke="#2563eb" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="Assault" stroke="#ef4444" />
                          <Line type="monotone" dataKey="Burglary" stroke="#f97316" />
                        </LineChart>
                      </ResponsiveContainer>
                    </TabsContent>
                    
                    <TabsContent value="bar" className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={trendData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Theft" stackId="a" fill="#2563eb" />
                          <Bar dataKey="Assault" stackId="a" fill="#ef4444" />
                          <Bar dataKey="Burglary" stackId="a" fill="#f97316" />
                        </BarChart>
                      </ResponsiveContainer>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
