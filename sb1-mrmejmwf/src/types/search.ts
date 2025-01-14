export interface SearchFiltersState {
  category: string;
  priceRange: {
    min?: number;
    max?: number;
  };
  moq?: number;
  location: string;
  verifiedOnly: boolean;
  sortBy: 'newest' | 'popular' | 'price_low' | 'price_high';
}

export const DEFAULT_FILTERS: SearchFiltersState = {
  category: 'All Categories',
  priceRange: {},
  location: 'All Locations',
  verifiedOnly: false,
  sortBy: 'newest'
};