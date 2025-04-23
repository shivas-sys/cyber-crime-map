import React from "react";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { CrimeStatistics, TimePattern } from "@/lib/types";

interface StatisticsPanelProps {
  crimeType?: string;
  district?: string;
  dateRange?: string;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ crimeType, district, dateRange }) => {
  // Fetch crime statistics with filters
  const { data: statistics, isLoading: statsLoading } = useQuery<CrimeStatistics>({
    queryKey: ['/api/incidents'],
  });

  // Fetch time patterns
  const { data: timePatterns, isLoading: timeLoading } = useQuery<TimePattern[]>({
    queryKey: ['/api/incidents'],
  });

  // Calculate and transform data for display
  const crimeStats = React.useMemo(() => {
    if (!statistics) return {
      totalIncidents: 0,
      byType: []
    };

    // Transform the data for UI display
    return {
      totalIncidents: statistics.totalIncidents || 0,
      byType: statistics.byType || []
    };
  }, [statistics]);

  // Mock time data - this should be replaced with actual API data
  const timeData = [
    { hour: 0, count: 25, percentage: 20 },
    { hour: 3, count: 18, percentage: 15 },
    { hour: 6, count: 12, percentage: 10 },
    { hour: 9, count: 30, percentage: 25 },
    { hour: 12, count: 54, percentage: 45 },
    { hour: 15, count: 72, percentage: 60 },
    { hour: 18, count: 108, percentage: 90 },
    { hour: 21, count: 90, percentage: 75 }
  ];

  // Peak days data
  const peakDays = [
    { day: "Fri", percentage: 24, type: "danger" },
    { day: "Sat", percentage: 18, type: "danger" }
  ];

  return (
    <div className="flex flex-col space-y-6">
      {/* Crime summary card */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Crime Summary</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Total Incidents</span>
            <span className="text-2xl font-bold">1,283</span>
          </div>
          <div className="space-y-4">
            {statsLoading ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-10"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Theft</span>
                    <span className="text-sm font-medium">486</span>
                  </div>
                  <Progress value={38} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Assault</span>
                    <span className="text-sm font-medium">327</span>
                  </div>
                  <Progress value={25} className="h-1.5 bg-red-100" indicatorClassName="bg-red-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Burglary</span>
                    <span className="text-sm font-medium">215</span>
                  </div>
                  <Progress value={17} className="h-1.5 bg-yellow-100" indicatorClassName="bg-yellow-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Vandalism</span>
                    <span className="text-sm font-medium">153</span>
                  </div>
                  <Progress value={12} className="h-1.5 bg-green-100" indicatorClassName="bg-green-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Other</span>
                    <span className="text-sm font-medium">102</span>
                  </div>
                  <Progress value={8} className="h-1.5 bg-indigo-100" indicatorClassName="bg-indigo-500" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Time pattern analysis */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Time Patterns</h2>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500 block mb-2">Incidents by Time of Day</span>
              <div className="h-36 flex items-end space-x-1 justify-between">
                {timeData.map((data) => (
                  <div key={data.hour} className="flex flex-col items-center">
                    <div 
                      className="bg-primary hover:bg-primary/80 rounded-sm w-5 transition-all duration-200" 
                      style={{ height: `${data.percentage}%` }}
                    ></div>
                    <span className="text-xs mt-1">{data.hour === 0 ? '12a' : data.hour === 12 ? '12p' : data.hour > 12 ? `${data.hour-12}p` : `${data.hour}a`}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-500 block mb-2">Peak Incident Days</span>
              <div className="flex items-center space-x-3">
                {peakDays.map((day) => (
                  <div key={day.day} className="text-center flex flex-col">
                    <span className="text-xs">{day.day}</span>
                    <span className="text-sm font-medium text-red-600">+{day.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
