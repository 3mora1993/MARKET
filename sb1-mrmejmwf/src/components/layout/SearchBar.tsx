import React, { useState } from 'react';
import { Search, SlidersHorizontal, Camera } from 'lucide-react';
import { SearchFilters } from '../search/SearchFilters';
import { ImageSearch } from '../search/ImageSearch';
import { DEFAULT_FILTERS, type SearchFiltersState } from '../../types/search';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFiltersState, imageFile?: File) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [filters, setFilters] = useState<SearchFiltersState>(DEFAULT_FILTERS);
  const [imageFile, setImageFile] = useState<File>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters, imageFile);
  };

  const handleFilterChange = (newFilters: Partial<SearchFiltersState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onSearch(query, updatedFilters, imageFile);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    onSearch(query, DEFAULT_FILTERS, imageFile);
  };

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    onSearch(query, filters, file);
  };

  return (
    <div className="relative flex-1 max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, suppliers..."
          className="w-full pl-10 pr-28 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setShowImageSearch(!showImageSearch);
              setShowFilters(false);
            }}
            className={`p-1.5 rounded-md transition-colors ${
              showImageSearch ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
            title="Search by Image"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setShowFilters(!showFilters);
              setShowImageSearch(false);
            }}
            className={`p-1.5 rounded-md transition-colors ${
              showFilters ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
            title="Advanced Search"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </form>

      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onClose={() => setShowFilters(false)}
          />
        </div>
      )}

      {showImageSearch && (
        <ImageSearch
          onImageSelect={handleImageSelect}
          onClose={() => setShowImageSearch(false)}
        />
      )}
    </div>
  );
}