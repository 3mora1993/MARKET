import React from 'react';
import { BarChart3, ArrowUpRight } from 'lucide-react';

export function ProductAnalytics() {
  const topProducts = [
    { id: 1, name: 'Organic Whole Grain Pasta', views: 2345, inquiries: 45, ctr: '4.8%' },
    { id: 2, name: 'Premium Coffee Beans', views: 1890, inquiries: 38, ctr: '4.2%' },
    { id: 3, name: 'Organic Honey', views: 1456, inquiries: 29, ctr: '3.9%' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Product Performance</h2>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {topProducts.map(product => (
          <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-600">{product.views.toLocaleString()} views</span>
                <span className="text-sm text-gray-600">{product.inquiries} inquiries</span>
                <span className="text-sm text-gray-600">CTR: {product.ctr}</span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}