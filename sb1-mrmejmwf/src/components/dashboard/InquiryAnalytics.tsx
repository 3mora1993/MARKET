import React from 'react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

export function InquiryAnalytics() {
  const inquiryData = [
    { day: 'Mon', count: 42 },
    { day: 'Tue', count: 38 },
    { day: 'Wed', count: 55 },
    { day: 'Thu', count: 47 },
    { day: 'Fri', count: 35 },
    { day: 'Sat', count: 28 },
    { day: 'Sun', count: 25 }
  ];

  const maxCount = Math.max(...inquiryData.map(d => d.count));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold">Inquiry Trends</h2>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View Details
        </button>
      </div>

      <div className="h-48 flex items-end gap-2">
        {inquiryData.map(data => (
          <div key={data.day} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-green-100 rounded-t-lg transition-all duration-300 hover:bg-green-200"
              style={{ height: `${(data.count / maxCount) * 100}%` }}
            >
              <div className="text-xs text-green-800 text-center mt-1">
                {data.count}
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-2">{data.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}