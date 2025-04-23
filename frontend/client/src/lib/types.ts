// Type definitions for client-side use

export interface CrimeIncident {
  id: number;
  crimeType: string;
  latitude: number;
  longitude: number;
  district: string;
  description?: string;
  dateTime: string | Date;
  status: string;
}

export interface District {
  id: number;
  name: string;
  description?: string;
}

export interface CrimeType {
  id: number;
  name: string;
  description?: string;
  severity: number;
}

export interface DataImport {
  id: number;
  fileName: string;
  importDate: string | Date;
  status: string;
  recordCount?: number;
  fileType: string;
  metadata?: any;
}

export interface Setting {
  id: number;
  key: string;
  value: string;
  description?: string;
}

export interface CrimeStatistics {
  totalIncidents: number;
  byType: {
    type: string;
    count: number;
    percentage: number;
  }[];
}

export interface TimePattern {
  hour: number;
  count: number;
  percentage: number;
}

export interface DateRangeFilter {
  start: Date;
  end: Date;
}

export interface FilterOptions {
  dateRange: string | DateRangeFilter;
  crimeType: string;
  district: string;
}

export interface MapView {
  center: [number, number];
  zoom: number;
  type: 'heatmap' | 'clusters' | 'individual';
}

export interface BehavioralInsight {
  text: string;
  type: 'success' | 'warning' | 'danger';
}

export interface PatternAnalysis {
  confidence: number;
  similarCases: number;
  methodSimilarity: number;
  insights: BehavioralInsight[];
}
