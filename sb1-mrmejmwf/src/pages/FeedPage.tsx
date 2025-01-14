import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductFeed } from '../components/ProductFeed';
import { SortOptions } from '../components/search/SortOptions';

export function FeedPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <SortOptions
          value="newest"
          onChange={(sortBy) => console.log('Sort by:', sortBy)}
        />
      </div>

      <ProductFeed 
        onSupplierClick={(supplierId) => navigate(`/supplier/${supplierId}`)}
      />
    </div>
  );
}