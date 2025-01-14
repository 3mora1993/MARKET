export type PremiumTier = 'standard' | 'featured' | 'spotlight';

export interface PremiumListing {
  id: string;
  supplierId: string;
  tier: PremiumTier;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  autoRenew: boolean;
}

export interface PremiumFeatures {
  standard: {
    position: 'normal',
    badge: false,
    analytics: false,
    priority: 0
  };
  featured: {
    position: 'top',
    badge: true,
    analytics: true,
    priority: 1
  };
  spotlight: {
    position: 'spotlight',
    badge: true,
    analytics: true,
    priority: 2,
    customBranding: true
  };
}