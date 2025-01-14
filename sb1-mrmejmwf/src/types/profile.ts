export type UserRole = 'supplier' | 'buyer' | 'both';

export interface BusinessProfile {
  id: string;
  name: string;
  avatar: string;
  description: string;
  location: string;
  contactEmail: string;
  phone: string;
  joinedDate: string;
  role: UserRole;
  categories: string[];
  metrics: {
    totalProducts?: number; // Optional for buyers
    totalOrders: number;
    responseRate: number;
    avgResponseTime: string;
  };
  verification: {
    isVerified: boolean;
    taxAuthorityVerified: boolean;
    lastDocumentUpdate: string;
    documentStatus: 'pending' | 'verified' | 'expired' | 'rejected';
  };
  notableClients?: Client[]; // Only for suppliers
  notableSuppliers?: Client[]; // Only for buyers
  buyerMetrics?: {
    totalSpent: number;
    averageOrderValue: number;
    repeatPurchaseRate: number;
  };
  supplierMetrics?: {
    totalRevenue: number;
    averageOrderValue: number;
    productCount: number;
  };
}