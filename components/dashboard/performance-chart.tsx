"use client";

import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from 'next-themes';

const performanceData = [
  {
    date: '01/05',
    impressions: 4000,
    clicks: 240,
    conversions: 24,
  },
  {
    date: '02/05',
    impressions: 3500,
    clicks: 230,
    conversions: 22,
  },
  {
    date: '03/05',
    impressions: 5200,
    clicks: 290,
    conversions: 32,
  },
  {
    date: '04/05',
    impressions: 4780,
    clicks: 278,
    conversions: 25,
  },
  {
    date: '05/05',
    impressions: 5890,
    clicks: 320,
    conversions: 37,
  },
  {
    date: '06/05',
    impressions: 6100,
    clicks: 350,
    conversions: 42,
  },
  {
    date: '07/05',
    impressions: 5780,
    clicks: 310,
    conversions: 36,
  },
];

export function PerformanceChart() {
  const [timeRange, setTimeRange] = useState('week');
  const { theme } = useTheme();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-3 shadow-md">
          <p className="font-medium text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center mt-2">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-xs">
                <span className="capitalize">{entry.name}: </span>
                <span className="font-medium">
                  {entry.name === 'impressions' 
                    ? entry.value.toLocaleString() 
                    : entry.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
          <ToggleGroupItem value="day" aria-label="Toggle day view">Day</ToggleGroupItem>
          <ToggleGroupItem value="week" aria-label="Toggle week view">Week</ToggleGroupItem>
          <ToggleGroupItem value="month" aria-label="Toggle month view">Month</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={performanceData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              stroke={theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} 
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
              tick={{ fontSize: 12 }}
              stroke={theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              stroke={theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="impressions"
              name="Impressions"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2, fill: "hsl(var(--background))" }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conversions"
              name="Conversions"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: "hsl(var(--chart-2))", strokeWidth: 2, fill: "hsl(var(--background))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}