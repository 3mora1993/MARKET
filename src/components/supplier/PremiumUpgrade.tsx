import React, { useState } from 'react';
import { Star, Sparkles, Check } from 'lucide-react';
import type { PremiumTier } from '../../types/premium';

const PREMIUM_PLANS = {
  featured: {
    name: 'Featured',
    price: 99,
    period: 'month',
    icon: <Star className="w-6 h-6" />,
    features: [
      'Priority placement in search results',
      'Featured badge on listings',
      'Advanced analytics',
      'Priority support'
    ]
  },
  spotlight: {
    name: 'Spotlight',
    price: 299,
    period: 'month',
    icon: <Sparkles className="w-6 h-6" />,
    features: [
      'Top placement in search results',
      'Premium spotlight badge',
      'Custom branding options',
      'Real-time analytics dashboard',
      'Dedicated account manager',
      'Marketing insights'
    ]
  }
};

interface PremiumUpgradeProps {
  onSelect: (tier: PremiumTier) => void;
}

export function PremiumUpgrade({ onSelect }: PremiumUpgradeProps) {
  const [selectedTier, setSelectedTier] = useState<PremiumTier>('featured');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
        <p className="text-gray-600 mt-2">
          Boost your visibility and grow your business with our premium plans
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {(Object.entries(PREMIUM_PLANS) as [PremiumTier, typeof PREMIUM_PLANS.featured][]).map(([tier, plan]) => (
          <div
            key={tier}
            className={`border rounded-lg p-6 cursor-pointer transition-all ${
              selectedTier === tier 
                ? 'border-blue-600 ring-2 ring-blue-100'
                : 'hover:border-blue-200'
            }`}
            onClick={() => setSelectedTier(tier)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {plan.icon}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${plan.price}</p>
                <p className="text-sm text-gray-600">per {plan.period}</p>
              </div>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => onSelect(selectedTier)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}