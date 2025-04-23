import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { FilterOptions } from "@/lib/types";

const Reports: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: "30days",
    crimeType: "all",
    district: "all"
  });

  const [reportType, setReportType] = useState("summary");

  // Query for data - actual implementation would call appropriate API endpoints
  const { data: districts = [] } = useQuery({
    queryKey: ["/api/districts"],
  });

  const { data: crimeTypes = [] } = useQuery({
    queryKey: ["/api/crime-types"],
  });

  const handleExportPDF = () => {
    // Implementation for PDF export
    console.log("Exporting PDF report");
  };

  const handlePrintReport = () => {
    // Implementation for printing
    window.print();
  };

  const handleEmailReport = () => {
    // Implementation for emailing report
    console.log("Emailing report");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Crime Reports & Analysis" />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Report Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Report Generator</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Create and export detailed crime analysis reports
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={handlePrintReport}>
                    <i className="ri-printer-line mr-2"></i> Print
                  </Button>
                  <Button variant="outline" onClick={handleEmailReport}>
                    <i className="ri-mail-send-line mr-2"></i> Email
                  </Button>
                  <Button onClick={handleExportPDF}>
                    <i className="ri-file-pdf-line mr-2"></i> Export PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Report Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left column - Report settings */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Report Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Report Type</label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Summary Report</SelectItem>
                        <SelectItem value="detailed">Detailed Analysis</SelectItem>
                        <SelectItem value="trends">Trend Analysis</SelectItem>
                        <SelectItem value="behavioral">Behavioral Report</SelectItem>
                        <SelectItem value="hotspot">Hotspot Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Date Range</label>
                    <Select 
                      value={filters.dateRange as string} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="90days">Last 90 days</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Crime Type</label>
                    <Select 
                      value={filters.crimeType} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, crimeType: value }))}
                    >
                      <SelectTrigger>
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
                    <label className="text-sm font-medium block mb-1">District</label>
                    <Select 
                      value={filters.district} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, district: value }))}
                    >
                      <SelectTrigger>
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
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Visualization Options</label>
                    <div className="flex flex-col space-y-2 mt-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="include-charts" className="mr-2" defaultChecked />
                        <label htmlFor="include-charts" className="text-sm">Include charts</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="include-maps" className="mr-2" defaultChecked />
                        <label htmlFor="include-maps" className="text-sm">Include maps</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="include-tables" className="mr-2" defaultChecked />
                        <label htmlFor="include-tables" className="text-sm">Include data tables</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="include-analysis" className="mr-2" defaultChecked />
                        <label htmlFor="include-analysis" className="text-sm">Include analysis</label>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">
                    <i className="ri-refresh-line mr-2"></i> Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Report preview */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Report Preview</CardTitle>
                  <CardDescription>
                    {reportType === "summary" && "Crime summary statistics and overview"}
                    {reportType === "detailed" && "Detailed breakdown of incidents and patterns"}
                    {reportType === "trends" && "Trend analysis over the selected time period"}
                    {reportType === "behavioral" && "Behavioral pattern analysis and insights"}
                    {reportType === "hotspot" && "Geographic hotspot mapping and analysis"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="charts">Charts</TabsTrigger>
                      <TabsTrigger value="tables">Data Tables</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="preview" className="space-y-6">
                      <div className="border p-6 rounded-lg">
                        <div className="text-center mb-8">
                          <h1 className="text-2xl font-bold mb-2">Crime Analysis Report</h1>
                          <p className="text-gray-500">
                            {filters.dateRange === "7days" 
                              ? "Last 7 Days" 
                              : filters.dateRange === "30days" 
                                ? "Last 30 Days" 
                                : "Last 90 Days"}
                          </p>
                          <p className="text-gray-500">
                            {filters.district === "all" ? "All Districts" : filters.district} | 
                            {filters.crimeType === "all" ? " All Crime Types" : ` ${filters.crimeType}`}
                          </p>
                        </div>
                        
                        <div className="mb-6">
                          <h2 className="text-xl font-bold mb-3">Executive Summary</h2>
                          <p className="text-gray-700 mb-3">
                            This report provides a comprehensive analysis of crime incidents 
                            reported within the selected time period and geographic area. It identifies 
                            key trends, patterns, and potential hotspots to assist law enforcement 
                            in resource allocation and preventative measures.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                              <p className="text-sm text-gray-500">Total Incidents</p>
                              <p className="text-2xl font-bold">1,283</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                              <p className="text-sm text-gray-500">Monthly Change</p>
                              <p className="text-2xl font-bold text-green-600">-4.2%</p>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-lg text-center">
                              <p className="text-sm text-gray-500">High Risk Areas</p>
                              <p className="text-2xl font-bold">3</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h2 className="text-xl font-bold mb-3">Key Findings</h2>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Theft incidents have increased by 8% in the Downtown area</li>
                            <li>Significant reduction in vandalism cases following increased patrols</li>
                            <li>Emerging pattern of residential burglaries in East Side district</li>
                            <li>Strong correlation between peak crime times and public transit schedules</li>
                          </ul>
                        </div>
                        
                        <div className="mb-6">
                          <h2 className="text-xl font-bold mb-3">Recommendations</h2>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Increase evening patrol presence at transit stops in Downtown area</li>
                            <li>Implement community watch program in East Side residential areas</li>
                            <li>Coordinate with transit authorities to enhance security during peak hours</li>
                            <li>Continue vandalism prevention measures in North District</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="charts">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded-lg p-4">
                          <h3 className="text-lg font-medium mb-2">Crime by Type</h3>
                          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                            <p className="text-gray-500">Pie chart visualization would be displayed here</p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h3 className="text-lg font-medium mb-2">Crime by District</h3>
                          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                            <p className="text-gray-500">Bar chart visualization would be displayed here</p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h3 className="text-lg font-medium mb-2">Crime Trends</h3>
                          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                            <p className="text-gray-500">Line chart visualization would be displayed here</p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h3 className="text-lg font-medium mb-2">Time Distribution</h3>
                          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                            <p className="text-gray-500">Heat map visualization would be displayed here</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tables">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Crime Incidents by Type</h3>
                          <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crime Type</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incidents</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Theft</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">486</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">38%</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">+8%</td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Assault</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">327</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">25%</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">+3%</td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Burglary</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">215</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">17%</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">+12%</td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Vandalism</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">153</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">12%</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">-15%</td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Other</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">102</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">8%</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Crime Incidents by District</h3>
                          <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incidents</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Downtown</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">486</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">38%</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">High</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">North Side</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">327</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">25%</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">East Side</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">215</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">17%</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">High</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">South Side</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">153</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">12%</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">West End</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">102</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">8%</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Low</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Report Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Report Templates</CardTitle>
              <CardDescription>
                Use or modify previously saved report templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Monthly Crime Summary</h3>
                      <p className="text-sm text-gray-500 mt-1">All districts, all crime types</p>
                    </div>
                    <div className="flex">
                      <button className="text-gray-400 hover:text-gray-500 p-1">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="text-gray-400 hover:text-red-500 p-1">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Last generated: 2 weeks ago
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Downtown Safety Report</h3>
                      <p className="text-sm text-gray-500 mt-1">Downtown district focus</p>
                    </div>
                    <div className="flex">
                      <button className="text-gray-400 hover:text-gray-500 p-1">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="text-gray-400 hover:text-red-500 p-1">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Last generated: 3 days ago
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Behavioral Pattern Analysis</h3>
                      <p className="text-sm text-gray-500 mt-1">Detailed offender behavior study</p>
                    </div>
                    <div className="flex">
                      <button className="text-gray-400 hover:text-gray-500 p-1">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="text-gray-400 hover:text-red-500 p-1">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Last generated: 1 week ago
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;
