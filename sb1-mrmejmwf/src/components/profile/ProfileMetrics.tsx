import React from 'react';
import { Package, Clock, MessageCircle, ShoppingCart, DollarSign, BarChart } from 'lucide-react';
import type { BusinessProfile } from '../../types/profile';

interface ProfileMetricsProps {
  profile: BusinessProfile;
}

export function ProfileMetrics({ profile }: ProfileMetricsProps) {
  const renderSupplierMetrics = () => (
    <>
      <MetricCard
        icon={<Package className="w-8 h-8 text-blue-600" />}
        label="Total Products"
        value={profile.metrics.totalProducts?.toString() || '0'}
      />
      <MetricCard
        icon={<DollarSign className="w-8 h-8 text-green-600" />}
        label="Total Revenue"
        value={`$${profile.supplierMetrics?.totalRevenue.toLocaleString()}`}
      />
      <MetricCard
        icon={<BarChart className="w-8 h-8 text-purple-600" />}
        label="Avg. Order Value"
        value={`$${profile.supplierMetrics?.averageOrderValue.toLocaleString()}`}
      />
    </>
  );

  const renderBuyerMetrics = () => (
    <>
      <MetricCard
        icon={<ShoppingCart className="w-8 h-8 text-blue-600" />}
        label="Total Orders"
        value={profile.metrics.totalOrders.toString()}
      />
      <MetricCard
        icon={<DollarSign className="w-8 h-8 text-green-600" />}
        label="Total Spent"
        value={`$${profile.buyerMetrics?.totalSpent.toLocaleString()}`}
      />
      <MetricCard
        icon={<BarChart className="w-8 h-8 text-purple-600" />}
        label="Repeat Purchase Rate"
        value={`${profile.buyerMetrics?.repeatPurchaseRate}%`}
      />
    </>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {profile.role === 'supplier' && renderSupplierMetrics()}
      {profile.role === 'buyer' && renderBuyerMetrics()}
      {profile.role === 'both' && (
        <>
          {renderSupplierMetrics()}
          <div className="md:col-span-3 my-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Buyer Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderBuyerMetrics()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}