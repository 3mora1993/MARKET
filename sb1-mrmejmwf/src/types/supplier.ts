export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  contractDate: string;
  testimonial?: string;
}

export interface VerificationStatus {
  isVerified: boolean;
  taxAuthorityVerified: boolean;
  lastDocumentUpdate: string;
  documentStatus: 'pending' | 'verified' | 'expired' | 'rejected';
}

export interface Supplier {
  id: string;
  name: string;
  avatar: string;
  description: string;
  location: string;
  contactEmail: string;
  phone: string;
  joinedDate: string;
  categories: string[];
  metrics: {
    totalProducts: number;
    responseRate: number;
    avgResponseTime: string;
  };
  notableClients: Client[];
  verification: VerificationStatus;
}