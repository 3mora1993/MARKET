import React from 'react';
import { X } from 'lucide-react';

interface QuickFiltersProps {
  selectedFilters: string[];
  onFilterSelect: (filter: string) => void;
  onFilterRemove: (filter: string) => void;
}

export function QuickFilters({ selectedFilters, onFilterSelect, onFilterRemove }: QuickFiltersProps) {
  const popularFilters = [
    'Organic', 'Sustainable', 'New Arrivals', 'Verified Suppliers',
    'Free Shipping', 'Bulk Discount', 'In Stock', 'Featured'
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {popularFilters.map(filter => (
          <button
            key={filter}
            onClick={() => onFilterSelect(filter)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedFilters.includes(filter)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {selectedFilters.length > 0 && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-gray-600">Active Filters:</span>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map(filter => (
              <span
                key={filter}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
              >
                {filter}
                <button
                  onClick={() => onFilterRemove(filter)}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}