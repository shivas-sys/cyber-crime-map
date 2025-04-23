import React from "react";
import {
  BarChart as ReChartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { 
  ValueType, 
  NameType
} from "recharts/types/component/DefaultTooltipContent";

interface BarChartProps {
  data: { name: string; value: number }[];
  xAxisDataKey: string;
  barDataKey: string;
  barColor?: string;
  height?: number;
  tooltipFormatter?: (value: number) => string;
}

const CustomTooltip = ({ 
  active, 
  payload, 
  label,
  formatter 
}: TooltipProps<ValueType, NameType> & { formatter?: (value: number) => string }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value as number;
    
    return (
      <div className="bg-white p-2 border rounded shadow text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-primary">
          {formatter ? formatter(value) : value}
        </p>
      </div>
    );
  }
  
  return null;
};

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  xAxisDataKey, 
  barDataKey, 
  barColor = "hsl(var(--primary))", 
  height = 300,
  tooltipFormatter 
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReChartsBarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey={xAxisDataKey} 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "#eee" }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          content={<CustomTooltip formatter={tooltipFormatter} />} 
        />
        <Bar 
          dataKey={barDataKey} 
          fill={barColor} 
          radius={[4, 4, 0, 0]}
          barSize={30}
        />
      </ReChartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
