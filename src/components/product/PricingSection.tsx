import React from 'react';
import { Package2, Info } from 'lucide-react';
import type { PriceTier } from '../../types/product';

interface PricingSectionProps {
  priceTiers: PriceTier[];
  moq: number;
  quantity: number;
}

export function PricingSection({ priceTiers, moq, quantity }: PricingSectionProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Pricing Tiers</h3>
        <div className="space-y-3">
          {priceTiers.map((tier, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div className="flex items-center gap-2">
                <Package2 className="w-5 h-5 text-gray-500" />
                <span className="text-sm">
                  {tier.minQuantity}+ units
                </span>
              </div>
              <span className="font-semibold">
                ${tier.price.toFixed(2)}/unit
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <Info className="w-5 h-5" />
            <span className="font-medium">MOQ</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{moq} units</p>
        </div>
        <div className="flex-1 bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <Package2 className="w-5 h-5" />
            <span className="font-medium">Stock</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{quantity} units</p>
        </div>
      </div>
    </div>
  );
}