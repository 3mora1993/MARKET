import React from 'react';
import { type Supplier } from '../../types/supplier';
import { Package, Clock, MessageCircle } from 'lucide-react';

interface SupplierMetricsProps {
  metrics: Supplier['metrics'];
}

export function SupplierMetrics({ metrics }: SupplierMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Total Products</p>
            <p className="text-2xl font-bold">{metrics.totalProducts}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Response Rate</p>
            <p className="text-2xl font-bold">{metrics.responseRate}%</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-purple-600" />
          <div>
            <p className="text-sm text-gray-600">Avg. Response Time</p>
            <p className="text-2xl font-bold">{metrics.avgResponseTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}