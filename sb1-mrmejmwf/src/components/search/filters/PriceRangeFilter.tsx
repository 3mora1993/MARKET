import React from 'react';
import { DollarSign } from 'lucide-react';

interface PriceRangeFilterProps {
  range: { min?: number; max?: number };
  onChange: (range: { min?: number; max?: number }) => void;
}

export function PriceRangeFilter({ range, onChange }: PriceRangeFilterProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
        <DollarSign className="w-4 h-4" />
        Price Range
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          min="0"
          placeholder="Min"
          value={range.min || ''}
          onChange={(e) => onChange({ ...range, min: e.target.value ? Number(e.target.value) : undefined })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          min="0"
          placeholder="Max"
          value={range.max || ''}
          onChange={(e) => onChange({ ...range, max: e.target.value ? Number(e.target.value) : undefined })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}