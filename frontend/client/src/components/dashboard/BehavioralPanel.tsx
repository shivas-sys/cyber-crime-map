import React from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { PatternAnalysis } from "@/lib/types";

interface BehavioralPanelProps {
  crimeType?: string;
  district?: string;
  dateRange?: string;
}

const BehavioralPanel: React.FC<BehavioralPanelProps> = ({ crimeType, district, dateRange }) => {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  // This would normally be an API call but we're using mock data here
  const patternAnalysis: PatternAnalysis = {
    confidence: 68,
    similarCases: 24,
    methodSimilarity: 82,
    insights: [
      {
        text: "High correlation between theft incidents and public transit stops during evening rush hours (6-8pm)",
        type: "success"
      },
      {
        text: "Recurring pattern of vandalism in North District on weekend nights, suggesting organized activity",
        type: "success"
      },
      {
        text: "Emerging pattern: Increase in daytime residential burglaries in East Side, targeting senior communities",
        type: "warning"
      }
    ]
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate analysis processing
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">Behavioral Analysis</h2>
        <div>
          <Button variant="ghost" size="sm" className="text-xs">
            View Full Report
          </Button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Pattern Recognition</div>
            <div className="text-xl font-semibold">{patternAnalysis.confidence}%</div>
            <div className="text-xs text-gray-500 mt-1">Confidence level</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Similar Cases</div>
            <div className="text-xl font-semibold">{patternAnalysis.similarCases}</div>
            <div className="text-xs text-gray-500 mt-1">Matching pattern</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Method Similarity</div>
            <div className="text-xl font-semibold">{patternAnalysis.methodSimilarity}%</div>
            <div className="text-xs text-gray-500 mt-1">Correlation</div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h3>
          <ul className="space-y-2 text-sm">
            {patternAnalysis.insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <i className={`${insight.type === 'success' ? 'ri-checkbox-circle-line text-green-500' : 'ri-alert-line text-yellow-500'} mt-0.5 mr-2`}></i>
                <span>{insight.text}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-2">
          <Button 
            variant="secondary" 
            className="w-full" 
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
    </div>
  );
};

export default BehavioralPanel;
