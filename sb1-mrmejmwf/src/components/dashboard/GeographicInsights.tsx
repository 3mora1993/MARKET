import React from 'react';
import { Globe2 } from 'lucide-react';

export function GeographicInsights() {
  const regions = [
    { name: 'North America', inquiries: 145, percentage: 35 },
    { name: 'Europe', inquiries: 98, percentage: 25 },
    { name: 'Asia', inquiries: 78, percentage: 20 },
    { name: 'South America', inquiries: 45, percentage: 12 },
    { name: 'Other', inquiries: 32, percentage: 8 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe2 className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold">Geographic Distribution</h2>
      </div>

      <div className="space-y-4">
        {regions.map(region => (
          <div key={region.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{region.name}</span>
              <span className="text-sm text-gray-600">{region.inquiries} inquiries</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${region.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}