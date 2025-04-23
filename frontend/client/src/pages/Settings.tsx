import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const Settings: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  // Query for current settings
  const { data: settings, isLoading } = useQuery({
    queryKey: ["/api/settings"],
  });

  // Mutation for saving settings
  const saveMutation = useMutation({
    mutationFn: async (updatedSettings: any) => {
      const response = await apiRequest("POST", "/api/settings", updatedSettings);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
        variant: "default",
      });
      setSaving(false);
    },
    onError: (error) => {
      toast({
        title: "Error saving settings",
        description: error.message || "There was an error saving your settings.",
        variant: "destructive",
      });
      setSaving(false);
    }
  });

  const handleSaveSettings = () => {
    setSaving(true);
    // Gather all settings and save them
    // For this implementation, we'll just simulate a successful save
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
        variant: "default",
      });
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="System Settings" />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Settings Tabs */}
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="flex bg-gray-100 p-1 rounded-t-lg">
                  <TabsTrigger 
                    value="general" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                  >
                    <i className="ri-settings-4-line mr-2"></i>
                    General
                  </TabsTrigger>
                  <TabsTrigger 
                    value="map" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                  >
                    <i className="ri-map-2-line mr-2"></i>
                    Map & Visualization
                  </TabsTrigger>
                  <TabsTrigger 
                    value="data" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                  >
                    <i className="ri-database-2-line mr-2"></i>
                    Data Management
                  </TabsTrigger>
                  <TabsTrigger 
                    value="users" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                  >
                    <i className="ri-user-settings-line mr-2"></i>
                    Users & Permissions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="system" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                  >
                    <i className="ri-computer-line mr-2"></i>
                    System
                  </TabsTrigger>
                </TabsList>
                
                {/* General Settings */}
                <TabsContent value="general" className="p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Application Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="app-name">Application Name</Label>
                          <Input 
                            id="app-name" 
                            defaultValue="CrimeMapper" 
                            placeholder="Application Name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="department-name">Department Name</Label>
                          <Input 
                            id="department-name" 
                            defaultValue="Metro Police Department" 
                            placeholder="Department Name"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="app-description">Application Description</Label>
                        <textarea 
                          id="app-description" 
                          rows={3}
                          className="w-full p-2 border rounded-md"
                          defaultValue="Crime Hotspot Mapping & Behavioral Analysis System for law enforcement agencies."
                        ></textarea>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dark-mode">Dark Mode</Label>
                          <p className="text-sm text-gray-500">Enable dark mode for the application interface</p>
                        </div>
                        <Switch id="dark-mode" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifications">Notifications</Label>
                          <p className="text-sm text-gray-500">Enable system notifications</p>
                        </div>
                        <Switch id="notifications" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium mb-4">Default Settings</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="default-date-range">Default Date Range</Label>
                          <Select defaultValue="30days">
                            <SelectTrigger id="default-date-range">
                              <SelectValue placeholder="Select default date range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7days">Last 7 days</SelectItem>
                              <SelectItem value="30days">Last 30 days</SelectItem>
                              <SelectItem value="90days">Last 90 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="default-district">Default District</Label>
                          <Select defaultValue="all">
                            <SelectTrigger id="default-district">
                              <SelectValue placeholder="Select default district" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Districts</SelectItem>
                              <SelectItem value="downtown">Downtown</SelectItem>
                              <SelectItem value="north">North Side</SelectItem>
                              <SelectItem value="south">South Side</SelectItem>
                              <SelectItem value="east">East Side</SelectItem>
                              <SelectItem value="west">West End</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="default-crime-type">Default Crime Type</Label>
                          <Select defaultValue="all">
                            <SelectTrigger id="default-crime-type">
                              <SelectValue placeholder="Select default crime type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Crime Types</SelectItem>
                              <SelectItem value="theft">Theft</SelectItem>
                              <SelectItem value="assault">Assault</SelectItem>
                              <SelectItem value="burglary">Burglary</SelectItem>
                              <SelectItem value="vandalism">Vandalism</SelectItem>
                              <SelectItem value="robbery">Robbery</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Map Settings */}
                <TabsContent value="map" className="p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Map Configuration</h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="default-map-view">Default Map View</Label>
                          <Select defaultValue="heatmap">
                            <SelectTrigger id="default-map-view">
                              <SelectValue placeholder="Select default map view" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="heatmap">Heatmap</SelectItem>
                              <SelectItem value="clusters">Clusters</SelectItem>
                              <SelectItem value="individual">Individual Markers</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="map-provider">Map Provider</Label>
                          <Select defaultValue="osm">
                            <SelectTrigger id="map-provider">
                              <SelectValue placeholder="Select map provider" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="osm">OpenStreetMap</SelectItem>
                              <SelectItem value="google">Google Maps</SelectItem>
                              <SelectItem value="mapbox">Mapbox</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="default-latitude">Default Latitude</Label>
                          <Input 
                            id="default-latitude" 
                            defaultValue="40.73" 
                            placeholder="Default Latitude"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="default-longitude">Default Longitude</Label>
                          <Input 
                            id="default-longitude" 
                            defaultValue="-73.99" 
                            placeholder="Default Longitude"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="default-zoom">Default Zoom Level</Label>
                        <Input 
                          id="default-zoom" 
                          type="number" 
                          defaultValue="12" 
                          placeholder="Default Zoom Level"
                          min="1"
                          max="18"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="map-controls">Show Map Controls</Label>
                          <p className="text-sm text-gray-500">Display zoom and layer controls on the map</p>
                        </div>
                        <Switch id="map-controls" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="district-boundaries">Show District Boundaries</Label>
                          <p className="text-sm text-gray-500">Display district boundary lines on the map</p>
                        </div>
                        <Switch id="district-boundaries" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium mb-4">Heatmap Configuration</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="heatmap-radius">Heatmap Radius</Label>
                          <Input 
                            id="heatmap-radius" 
                            type="number" 
                            defaultValue="20" 
                            placeholder="Heatmap Radius"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="heatmap-blur">Heatmap Blur</Label>
                          <Input 
                            id="heatmap-blur" 
                            type="number" 
                            defaultValue="15" 
                            placeholder="Heatmap Blur"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="heatmap-opacity">Heatmap Opacity</Label>
                          <Input 
                            id="heatmap-opacity" 
                            type="number" 
                            defaultValue="0.8" 
                            placeholder="Heatmap Opacity"
                            min="0"
                            max="1"
                            step="0.1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Data Management Settings */}
                <TabsContent value="data" className="p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Data Management Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="data-retention">Data Retention Period</Label>
                          <Select defaultValue="1year">
                            <SelectTrigger id="data-retention">
                              <SelectValue placeholder="Select data retention period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6months">6 Months</SelectItem>
                              <SelectItem value="1year">1 Year</SelectItem>
                              <SelectItem value="2years">2 Years</SelectItem>
                              <SelectItem value="5years">5 Years</SelectItem>
                              <SelectItem value="indefinite">Indefinite</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="backup-frequency">Backup Frequency</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger id="backup-frequency">
                              <SelectValue placeholder="Select backup frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-clean">Automatic Data Cleaning</Label>
                          <p className="text-sm text-gray-500">Automatically clean and format imported data</p>
                        </div>
                        <Switch id="auto-clean" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-validation">Data Validation</Label>
                          <p className="text-sm text-gray-500">Validate data before importing</p>
                        </div>
                        <Switch id="data-validation" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="archive-data">Archive Old Data</Label>
                          <p className="text-sm text-gray-500">Automatically archive data past retention period</p>
                        </div>
                        <Switch id="archive-data" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium mb-4">API Integration</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="api-key">API Key</Label>
                        <div className="flex">
                          <Input 
                            id="api-key" 
                            type="password"
                            defaultValue="sk_test_12345678abcdefg" 
                            placeholder="Your API Key"
                            className="rounded-r-none"
                          />
                          <Button variant="outline" className="rounded-l-none border-l-0">
                            Reset Key
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">Used for external integrations and data access</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="api-url">API Base URL</Label>
                        <Input 
                          id="api-url" 
                          defaultValue="https://api.crimemapper.example.com/v1" 
                          placeholder="API Base URL"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="enable-api">Enable API Access</Label>
                          <p className="text-sm text-gray-500">Allow external systems to access data via API</p>
                        </div>
                        <Switch id="enable-api" defaultChecked />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Users & Permissions Settings */}
                <TabsContent value="users" className="p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">User Management</h2>
                    
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <i className="ri-user-line"></i>
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium">Officer Johnson</div>
                                    <div className="text-xs text-gray-500">johnson@example.com</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">Administrator</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                  Active
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Just now
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                  <button className="text-gray-500 hover:text-primary">
                                    <i className="ri-edit-line"></i>
                                  </button>
                                  <button className="text-gray-500 hover:text-red-500">
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <i className="ri-user-line"></i>
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium">Sergeant Smith</div>
                                    <div className="text-xs text-gray-500">smith@example.com</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">Analyst</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                  Active
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                3 hours ago
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                  <button className="text-gray-500 hover:text-primary">
                                    <i className="ri-edit-line"></i>
                                  </button>
                                  <button className="text-gray-500 hover:text-red-500">
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <i className="ri-user-line"></i>
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium">Officer Davis</div>
                                    <div className="text-xs text-gray-500">davis@example.com</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">Viewer</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                  Inactive
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2 days ago
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                  <button className="text-gray-500 hover:text-primary">
                                    <i className="ri-edit-line"></i>
                                  </button>
                                  <button className="text-gray-500 hover:text-red-500">
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <Button variant="outline">
                        <i className="ri-user-add-line mr-2"></i> Add New User
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium mb-4">Role Management</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Administrator</h3>
                            <button className="text-gray-500 hover:text-primary">
                              <i className="ri-edit-line"></i>
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Full system access and control</p>
                          <div className="space-y-1 text-xs text-gray-500">
                            <div className="flex items-center">
                              <i className="ri-checkbox-circle-line text-green-500 mr-1"></i>
                              <span>Create/Edit Users</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-checkbox-circle-line text-green-500 mr-1"></i>
                              <span>System Configuration</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-checkbox-circle-line text-green-500 mr-1"></i>
                              <span>Data Management</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Analyst</h3>
                            <button className="text-gray-500 hover:text-primary">
                              <i className="ri-edit-line"></i>
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Data analysis and reporting capabilities</p>
                          <div className="space-y-1 text-xs text-gray-500">
                            <div className="flex items-center">
                              <i className="ri-checkbox-circle-line text-green-500 mr-1"></i>
                              <span>View All Data</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-checkbox-circle-line text-green-500 mr-1"></i>
                              <span>Create Reports</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-close-circle-line text-red-500 mr-1"></i>
                              <span>System Configuration</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Viewer</h3>
                            <button className="text-gray-500 hover:text-primary">
                              <i className="ri-edit-line"></i>
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Read-only access to the system</p>
                          <div className="space-y-1 text-xs text-gray-500">
                            <div className="flex items-center">
                              <i className="ri-checkbox-circle-line text-green-500 mr-1"></i>
                              <span>View Dashboard</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-checkbox-circle-line text-green-500 mr-1"></i>
                              <span>View Reports</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-close-circle-line text-red-500 mr-1"></i>
                              <span>Edit/Create Data</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline">
                        <i className="ri-add-line mr-2"></i> Create New Role
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* System Settings */}
                <TabsContent value="system" className="p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">System Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-3">Application Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Version</span>
                            <span className="text-sm font-medium">1.2.3</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Build Date</span>
                            <span className="text-sm font-medium">June 15, 2023</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">License</span>
                            <span className="text-sm font-medium">Professional</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">License Expiry</span>
                            <span className="text-sm font-medium">Dec 31, 2023</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-3">Server Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Environment</span>
                            <span className="text-sm font-medium">Production</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Server OS</span>
                            <span className="text-sm font-medium">Linux 5.4.0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Database</span>
                            <span className="text-sm font-medium">PostgreSQL 13.4</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Memory Usage</span>
                            <span className="text-sm font-medium">1.2 GB / 4 GB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium mb-4">System Maintenance</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-updates">Automatic Updates</Label>
                          <p className="text-sm text-gray-500">Automatically update the system when new versions are available</p>
                        </div>
                        <Switch id="auto-updates" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="error-reporting">Error Reporting</Label>
                          <p className="text-sm text-gray-500">Send anonymous error reports to improve the system</p>
                        </div>
                        <Switch id="error-reporting" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="usage-stats">Usage Statistics</Label>
                          <p className="text-sm text-gray-500">Share anonymous usage statistics</p>
                        </div>
                        <Switch id="usage-stats" defaultChecked />
                      </div>
                      
                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Button variant="outline">
                            <i className="ri-refresh-line mr-2"></i> Check for Updates
                          </Button>
                          <Button variant="outline">
                            <i className="ri-database-2-line mr-2"></i> Database Maintenance
                          </Button>
                          <Button variant="outline">
                            <i className="ri-file-list-3-line mr-2"></i> View System Logs
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                            <i className="ri-restart-line mr-2"></i> Restart Application
                          </Button>
                          <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                            <i className="ri-delete-bin-5-line mr-2"></i> Clear All Data
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Save Settings Button */}
          <div className="flex justify-end">
            <Button 
              size="lg"
              onClick={handleSaveSettings}
              disabled={saving}
            >
              {saving ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i> Saving...
                </>
              ) : (
                <>
                  <i className="ri-save-line mr-2"></i> Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
