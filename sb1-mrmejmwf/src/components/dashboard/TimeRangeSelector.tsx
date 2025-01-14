import React from 'react';
import { Calendar } from 'lucide-react';

export function TimeRangeSelector() {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="w-5 h-5 text-gray-500" />
      <select className="border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
        <option value="1y">Last year</option>
      </select>
    </div>
  );
}