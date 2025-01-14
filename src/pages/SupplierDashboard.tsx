import React from 'react';
import { PerformanceOverview } from '../components/dashboard/PerformanceOverview';
import { ProductAnalytics } from '../components/dashboard/ProductAnalytics';
import { InquiryAnalytics } from '../components/dashboard/InquiryAnalytics';
import { GeographicInsights } from '../components/dashboard/GeographicInsights';
import { RecommendationPanel } from '../components/dashboard/RecommendationPanel';

export function SupplierDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Supplier Dashboard</h1>
      
      <div className="space-y-6">
        <PerformanceOverview />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductAnalytics />
          <InquiryAnalytics />
        </div>
        <GeographicInsights />
        <RecommendationPanel />
      </div>
    </div>
  );
}