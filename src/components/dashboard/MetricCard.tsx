import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  timeframe: string;
}

export function MetricCard({ icon, label, value, change, timeframe }: MetricCardProps) {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className={`text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </span>
            <span className="text-xs text-gray-500">{timeframe}</span>
          </div>
        </div>
      </div>
    </div>
  );
}