import React from 'react';
import { Eye, MessageSquare, MousePointer, TrendingUp } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { TimeRangeSelector } from './TimeRangeSelector';

export function PerformanceOverview() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Performance Overview</h2>
        <TimeRangeSelector />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Eye className="w-8 h-8 text-blue-600" />}
          label="Total Views"
          value="12,458"
          change="+15%"
          timeframe="vs last month"
        />
        <MetricCard
          icon={<MessageSquare className="w-8 h-8 text-green-600" />}
          label="Inquiries"
          value="284"
          change="+8%"
          timeframe="vs last month"
        />
        <MetricCard
          icon={<MousePointer className="w-8 h-8 text-purple-600" />}
          label="Avg. CTR"
          value="4.2%"
          change="-2%"
          timeframe="vs last month"
        />
        <MetricCard
          icon={<TrendingUp className="w-8 h-8 text-orange-600" />}
          label="Conversion Rate"
          value="2.8%"
          change="+5%"
          timeframe="vs last month"
        />
      </div>
    </div>
  );
}