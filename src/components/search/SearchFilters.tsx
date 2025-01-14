import React from 'react';
import { X } from 'lucide-react';
import { CategoryFilter } from './filters/CategoryFilter';
import { LocationFilter } from './filters/LocationFilter';
import { VerificationFilter } from './filters/VerificationFilter';
import { MOQFilter } from './filters/MOQFilter';
import { PriceRangeFilter } from './filters/PriceRangeFilter';
import type { SearchFiltersState } from '../../types/search';

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onFilterChange: (filters: Partial<SearchFiltersState>) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export function SearchFilters({ filters, onFilterChange, onClearFilters, onClose }: SearchFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && 
    (typeof value !== 'object' || Object.keys(value).length > 0)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-medium">Advanced Search</h2>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear All
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CategoryFilter
          selected={filters.category}
          onChange={category => onFilterChange({ category })}
        />
        <LocationFilter
          selected={filters.location}
          onChange={location => onFilterChange({ location })}
        />
        <PriceRangeFilter
          range={filters.priceRange}
          onChange={priceRange => onFilterChange({ priceRange })}
        />
        <MOQFilter
          value={filters.moq}
          onChange={moq => onFilterChange({ moq })}
        />
        <div className="md:col-span-2">
          <VerificationFilter
            value={filters.verifiedOnly}
            onChange={verifiedOnly => onFilterChange({ verifiedOnly })}
          />
        </div>
      </div>
    </div>
  );
}