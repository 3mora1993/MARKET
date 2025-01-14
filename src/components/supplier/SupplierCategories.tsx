import React from 'react';
import { Tag } from 'lucide-react';

interface SupplierCategoriesProps {
  categories: string[];
}

export function SupplierCategories({ categories }: SupplierCategoriesProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Product Categories</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span
            key={category}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}