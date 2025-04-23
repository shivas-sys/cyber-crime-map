import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { DataImport } from "@/lib/types";

const DataImportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query for recent imports
  const { data: recentImports = [], isLoading } = useQuery<DataImport[]>({
    queryKey: ["/api/data-imports"],
  });

  // File upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (fileData: FormData) => {
      const response = await apiRequest("POST", "/api/data-imports", {
        fileName: uploadingFile?.name,
        recordCount: 0,
        fileType: uploadingFile?.type.split('/').pop() || 'unknown',
        metadata: {}
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/data-imports"] });
      toast({
        title: "File uploaded successfully",
        description: "Your data is now being processed.",
        variant: "default",
      });
      setUploadingFile(null);
      setIsUploading(false);
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your file.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadingFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadingFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!uploadingFile) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', uploadingFile);
    uploadMutation.mutate(formData);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'validating':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'csv':
        return 'ri-file-text-line text-primary';
      case 'xlsx':
      case 'xls':
        return 'ri-file-excel-line text-green-500';
      case 'json':
        return 'ri-file-code-line text-yellow-500';
      default:
        return 'ri-file-line text-gray-500';
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Data Management" />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Main content */}
          <Card>
            <CardHeader>
              <CardTitle>Crime Data Management</CardTitle>
              <CardDescription>
                Import, manage and synchronize crime incident data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="upload">Upload Data</TabsTrigger>
                  <TabsTrigger value="history">Import History</TabsTrigger>
                  <TabsTrigger value="api">API Integration</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-4">
                  <div 
                    className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 text-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <i className="ri-upload-cloud-2-line text-4xl text-gray-400"></i>
                      {uploadingFile ? (
                        <div className="text-sm">
                          <p className="font-medium">{uploadingFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {(uploadingFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Drag & drop crime data files here, or</p>
                      )}
                      
                      <div className="flex space-x-2">
                        {!uploadingFile ? (
                          <Button asChild>
                            <label>
                              Browse Files
                              <input 
                                type="file" 
                                className="hidden" 
                                accept=".csv,.xlsx,.xls,.json"
                                onChange={handleFileChange}
                              />
                            </label>
                          </Button>
                        ) : (
                          <>
                            <Button variant="outline" onClick={() => setUploadingFile(null)}>
                              Remove
                            </Button>
                            <Button 
                              onClick={handleUpload} 
                              disabled={isUploading}
                            >
                              {isUploading ? (
                                <>
                                  <i className="ri-loader-4-line animate-spin mr-2"></i> Uploading...
                                </>
                              ) : (
                                'Upload'
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">Supported formats: CSV, XLS, JSON</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                    <h3 className="text-sm font-medium text-yellow-800">Data Format Requirements</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Please ensure your data file includes these required fields: Crime Type, Latitude, Longitude, Date/Time, District
                    </p>
                    <p className="text-xs text-yellow-600 mt-2">
                      <a href="#" className="underline">Download template</a> for the correct format
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  {isLoading ? (
                    <div className="h-60 flex items-center justify-center">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-md border">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dataset</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {recentImports.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No import data available. Upload a file to get started.
                                  </td>
                                </tr>
                              ) : (
                                recentImports.map((importData) => (
                                  <tr key={importData.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                      <div className="flex items-center">
                                        <i className={`${getFileIcon(importData.fileType)} mr-2`}></i>
                                        <span>{importData.fileName}</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {new Date(importData.importDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {importData.recordCount || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(importData.status)}`}>
                                        {importData.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <div className="flex space-x-2">
                                        <button className="text-gray-500 hover:text-primary">
                                          <i className="ri-eye-line"></i>
                                        </button>
                                        <button className="text-gray-500 hover:text-red-500">
                                          <i className="ri-delete-bin-line"></i>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-6">
                        <Button variant="outline">
                          <i className="ri-delete-bin-line mr-2"></i> Clear History
                        </Button>
                        <Button>
                          <i className="ri-download-line mr-2"></i> Export Log
                        </Button>
                      </div>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="api" className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="text-md font-medium mb-2">API Connection Setup</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Configure external data sources for automatic synchronization
                    </p>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium block mb-1">API Endpoint URL</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border rounded-md" 
                            placeholder="https://api.example.com/crimes"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">API Key</label>
                          <input 
                            type="password" 
                            className="w-full px-3 py-2 border rounded-md" 
                            placeholder="Your API key"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium block mb-1">Sync Frequency</label>
                        <select className="w-full px-3 py-2 border rounded-md">
                          <option>Every 12 hours</option>
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      
                      <div className="pt-2">
                        <Button className="w-full md:w-auto">
                          <i className="ri-link mr-2"></i> Connect API
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="text-md font-medium mb-2">Connected Services</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <i className="ri-database-2-line text-blue-500 mr-3 text-lg"></i>
                          <div>
                            <p className="font-medium">City Crime Database</p>
                            <p className="text-xs text-gray-500">Last sync: 2 days ago</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <i className="ri-refresh-line"></i>
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                            <i className="ri-close-line"></i>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <i className="ri-database-2-line text-green-500 mr-3 text-lg"></i>
                          <div>
                            <p className="font-medium">Police Reports API</p>
                            <p className="text-xs text-gray-500">Last sync: 6 hours ago</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <i className="ri-refresh-line"></i>
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                            <i className="ri-close-line"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Data Transformation Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Data Cleaning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Automatically clean and format imported crime data
                </p>
                <Button variant="outline" className="w-full">
                  <i className="ri-tools-line mr-2"></i> Configure Cleaning
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Data Validation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Set rules to validate data quality and accuracy
                </p>
                <Button variant="outline" className="w-full">
                  <i className="ri-checkbox-multiple-line mr-2"></i> Set Rules
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Data Export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Export crime data in various formats for analysis
                </p>
                <Button variant="outline" className="w-full">
                  <i className="ri-file-download-line mr-2"></i> Export Options
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataImportPage;
