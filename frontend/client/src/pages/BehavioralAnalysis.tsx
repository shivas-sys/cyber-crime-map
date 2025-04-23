import React, { useState } from "react";
import Header from "@/components/layout/Header";
import FilterControls from "@/components/filters/FilterControls";
import { FilterOptions } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { Progress } from "@/components/ui/progress";

const BehavioralAnalysis: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: "90days",
    crimeType: "all",
    district: "all"
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock behavioral data
  const patternStrengthData = [
    { factor: "Time Pattern", value: 75 },
    { factor: "Location Pattern", value: 85 },
    { factor: "Target Selection", value: 62 },
    { factor: "Method of Operation", value: 78 },
    { factor: "Offender Profile", value: 53 },
    { factor: "Victim Profile", value: 67 }
  ];

  const offenderPredictions = [
    { name: "Prior Convictions", value: 85 },
    { name: "Local Resident", value: 65 },
    { name: "Age Range 18-25", value: 72 },
    { name: "Acts Alone", value: 60 },
    { name: "Opportunistic", value: 78 }
  ];

  const patternInsights = [
    { 
      title: "Time-Location Correlation",
      description: "Strong pattern of theft incidents at public transit stops during evening rush hours (6-8pm)",
      confidence: 85,
      type: "success"
    },
    { 
      title: "Repeat Offender Pattern",
      description: "Recurring pattern of vandalism in North District on weekend nights, suggesting organized activity or repeat offenders",
      confidence: 72,
      type: "success"
    },
    { 
      title: "Emerging Pattern",
      description: "Increase in daytime residential burglaries in East Side, specifically targeting senior communities",
      confidence: 64,
      type: "warning"
    },
    { 
      title: "Method Evolution",
      description: "Change in robbery tactics from direct confrontation to distraction-based techniques",
      confidence: 58,
      type: "warning"
    }
  ];

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Behavioral Analysis Dashboard" />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Filters */}
          <FilterControls 
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
          
          {/* Top section - Analysis Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Pattern Recognition Engine</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Analyze crime data for behavioral patterns and predictive insights
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">
                    <i className="ri-file-chart-line mr-2"></i> View Reports
                  </Button>
                  <Button 
                    onClick={handleRunAnalysis}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i> Processing...
                      </>
                    ) : (
                      <>
                        <i className="ri-brain-line mr-2"></i> Run Advanced Analysis
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Analysis Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pattern Analysis Insights</CardTitle>
                  <CardDescription>
                    Behavioral patterns identified from crime incident data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="patterns">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="patterns">Key Patterns</TabsTrigger>
                      <TabsTrigger value="correlations">Correlations</TabsTrigger>
                      <TabsTrigger value="predictions">Predictions</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="patterns" className="space-y-6">
                      {patternInsights.map((insight, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${insight.type === 'success' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                              <i className={`${insight.type === 'success' ? 'ri-checkbox-circle-line text-green-600' : 'ri-alert-line text-yellow-600'} text-lg`}></i>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{insight.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span>Confidence</span>
                                  <span className="font-medium">{insight.confidence}%</span>
                                </div>
                                <Progress 
                                  value={insight.confidence} 
                                  className={`h-1.5 ${insight.confidence > 70 ? 'bg-green-100' : 'bg-yellow-100'}`}
                                  indicatorClassName={insight.confidence > 70 ? 'bg-green-600' : 'bg-yellow-600'}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="correlations">
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={150} data={patternStrengthData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="factor" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar
                              name="Pattern Strength"
                              dataKey="value"
                              stroke="#2563eb"
                              fill="#2563eb"
                              fillOpacity={0.6}
                            />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="predictions">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Based on behavioral analysis, the system predicts the following attributes of potential offenders with associated confidence levels:
                        </p>
                        
                        <div className="space-y-5 mt-4">
                          {offenderPredictions.map((item, index) => (
                            <div key={index}>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>{item.name}</span>
                                <span className="font-medium">{item.value}%</span>
                              </div>
                              <Progress 
                                value={item.value} 
                                className="h-2"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Temporal-Spatial Analysis</CardTitle>
                  <CardDescription>
                    Correlation between time, location and crime patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gray-50 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">
                      Temporal-spatial analysis visualization would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Pattern Recognition</div>
                    <div className="text-3xl font-semibold">68%</div>
                    <div className="text-xs text-gray-500 mt-1">Confidence level</div>
                    <Progress value={68} className="h-1.5 mt-2" />
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Similar Cases</div>
                    <div className="text-3xl font-semibold">24</div>
                    <div className="text-xs text-gray-500 mt-1">Matching pattern</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Method Similarity</div>
                    <div className="text-3xl font-semibold">82%</div>
                    <div className="text-xs text-gray-500 mt-1">Correlation</div>
                    <Progress value={82} className="h-1.5 mt-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommendation Engine</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                      <h3 className="text-sm font-medium text-blue-700">Patrol Recommendation</h3>
                      <p className="text-sm text-blue-600 mt-1">
                        Increase evening patrols (6-9pm) near transit stops in Downtown district
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                      <h3 className="text-sm font-medium text-yellow-700">Community Alert</h3>
                      <p className="text-sm text-yellow-600 mt-1">
                        Issue advisory for East Side senior communities about daytime security
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-3">
                      <h3 className="text-sm font-medium text-purple-700">Investigation Focus</h3>
                      <p className="text-sm text-purple-600 mt-1">
                        Cross-reference vandalism cases in North District for pattern matching
                      </p>
                    </div>
                    
                    <Button className="w-full mt-2">
                      <i className="ri-file-list-3-line mr-2"></i> Generate Full Recommendations
                    </Button>
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

export default BehavioralAnalysis;
