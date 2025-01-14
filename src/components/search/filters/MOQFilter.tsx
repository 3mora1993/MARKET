import React from 'react';
import { Package } from 'lucide-react';

interface MOQFilterProps {
  value?: number;
  onChange: (value?: number) => void;
}

export function MOQFilter({ value, onChange }: MOQFilterProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
        <Package className="w-4 h-4" />
        Minimum Order Quantity
      </label>
      <input
        type="number"
        min="0"
        placeholder="Enter MOQ"
        value={value || ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}