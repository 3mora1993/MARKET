import React from 'react';
import { InquiryHistory } from '../components/buyer/InquiryHistory';
import { Wishlist } from '../components/buyer/Wishlist';
import { NotificationCenter } from '../components/buyer/NotificationCenter';
import { DashboardMetrics } from '../components/buyer/DashboardMetrics';
import { Layout } from 'lucide-react';

export function BuyerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Welcome, John Doe</span>
          <Layout className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      <DashboardMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <InquiryHistory />
          <Wishlist />
        </div>
        <div>
          <NotificationCenter />
        </div>
      </div>
    </div>
  );
}