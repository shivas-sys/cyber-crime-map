import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { DataImport } from "@/lib/types";

const DataImportPanel: React.FC = () => {
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query for recent imports
  const { data: recentImports = [] } = useQuery<DataImport[]>({
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
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Data Management</h2>
      </div>
      <div className="p-4 space-y-4">
        <div 
          className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <i className="ri-upload-cloud-2-line text-3xl text-gray-400"></i>
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
                <Button asChild size="sm">
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
                  <Button size="sm" onClick={() => setUploadingFile(null)} variant="outline">
                    Remove
                  </Button>
                  <Button 
                    size="sm" 
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
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Imports</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dataset</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentImports.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-4 text-center text-sm text-gray-500">
                      No import data available. Upload a file to get started.
                    </td>
                  </tr>
                ) : (
                  recentImports.map((importData) => (
                    <tr key={importData.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <i className={`${getFileIcon(importData.fileType)} mr-2`}></i>
                          <span>{importData.fileName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {new Date(importData.importDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(importData.status)}`}>
                          {importData.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="pt-2 flex space-x-3">
          <Button variant="outline" className="flex-1">
            <i className="ri-database-2-line mr-2"></i> Manage Data
          </Button>
          <Button className="flex-1">
            <i className="ri-refresh-line mr-2"></i> Sync Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataImportPanel;
