import React from 'react';
import { ShoppingCart, Clock, MessageSquare, Heart } from 'lucide-react';

const METRICS = [
  {
    label: 'Total Inquiries',
    value: '24',
    icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
    change: '+12%'
  },
  {
    label: 'Active Orders',
    value: '8',
    icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
    change: '+5%'
  },
  {
    label: 'Avg. Response Time',
    value: '2.5h',
    icon: <Clock className="w-8 h-8 text-purple-600" />,
    change: '-15%'
  },
  {
    label: 'Saved Items',
    value: '16',
    icon: <Heart className="w-8 h-8 text-red-600" />,
    change: '+8%'
  }
];

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {METRICS.map((metric) => (
        <div key={metric.label} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            {metric.icon}
            <div>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{metric.value}</p>
                <span className={`text-xs ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}