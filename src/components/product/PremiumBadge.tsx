import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import type { PremiumTier } from '../../types/premium';

interface PremiumBadgeProps {
  tier: PremiumTier;
}

export function PremiumBadge({ tier }: PremiumBadgeProps) {
  if (tier === 'standard') return null;

  return (
    <div className={`absolute top-2 left-2 px-2 py-1 rounded-full flex items-center gap-1 ${
      tier === 'spotlight' 
        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
        : 'bg-blue-600 text-white'
    }`}>
      {tier === 'spotlight' ? (
        <Sparkles className="w-4 h-4" />
      ) : (
        <Star className="w-4 h-4" />
      )}
      <span className="text-xs font-medium capitalize">{tier}</span>
    </div>
  );
}