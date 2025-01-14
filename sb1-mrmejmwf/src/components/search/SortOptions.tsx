import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortOptionsProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortOptions({ value, onChange }: SortOptionsProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-5 h-5 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="newest">Newest First</option>
        <option value="popular">Most Popular</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
      </select>
    </div>
  );
}