export interface PriceTier {
  minQuantity: number;
  price: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  barcode: string;
  priceRange: {
    min: number;
    max: number;
  };
  priceTiers: PriceTier[];
  moq: number;
  imageUrl: string;
  images?: string[];
  quantity: number;
  expiryDate: string;
  isNew?: boolean;
  supplier: {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    responseRate?: number;
    avgResponseTime?: string;
    isVerified?: boolean;
    location?: string;
  };
  category: string;
  createdAt: string;
  specifications?: Record<string, string>;
  certifications?: string[];
  packagingDetails?: {
    type: string;
    weight: string;
    dimensions: string;
  };
}