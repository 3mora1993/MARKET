import React, { useState } from 'react';
import { Plus, Search, MoreVertical } from 'lucide-react';

interface SimpleProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
}

export function ProductList() {
  const [products, setProducts] = useState<SimpleProduct[]>([
    {
      id: '1',
      name: 'Organic Green Tea',
      sku: 'TEA-001',
      price: 12.99,
      stock: 150,
      category: 'Beverages'
    },
    {
      id: '2',
      name: 'Natural Honey',
      sku: 'HON-002',
      price: 8.99,
      stock: 75,
      category: 'Sweeteners'
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Product List</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="mb-4 relative">
        <input
          type="search"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">SKU</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Price</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{product.sku}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{product.category}</td>
                <td className="py-3 px-4 text-right font-medium">${product.price.toFixed(2)}</td>
                <td className="py-3 px-4 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 100 ? 'bg-green-100 text-green-800' :
                    product.stock > 50 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}