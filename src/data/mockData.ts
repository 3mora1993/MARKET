// Mock data for the application
import type { Supplier } from '../types/supplier';

export const MOCK_SUPPLIER: Supplier = {
  id: 's1',
  name: 'Organic Foods Co.',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
  description: 'Leading supplier of organic and sustainable food products. We work directly with farmers to bring you the highest quality ingredients.',
  location: 'Portland, Oregon',
  contactEmail: 'contact@organicfoods.co',
  phone: '+972507227335',
  joinedDate: '2023-06-15T10:00:00Z',
  categories: ['Organic', 'Grains', 'Pasta', 'Beverages', 'Health Foods'],
  metrics: {
    totalProducts: 128,
    responseRate: 98,
    avgResponseTime: '2.5 hours'
  },
  verification: {
    isVerified: true,
    taxAuthorityVerified: true,
    lastDocumentUpdate: '2024-02-15T10:00:00Z',
    documentStatus: 'verified'
  },
  notableClients: [
    {
      id: 'c1',
      name: 'Whole Foods Market',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=200',
      industry: 'Retail',
      contractDate: '2023-01-15T00:00:00Z',
      testimonial: 'Consistently high-quality organic products and reliable delivery.'
    },
    {
      id: 'c2',
      name: 'Green Earth Cafes',
      logo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=200',
      industry: 'Food Service',
      contractDate: '2023-03-20T00:00:00Z',
      testimonial: 'Their sustainable practices align perfectly with our values.'
    },
    {
      id: 'c3',
      name: 'Fresh & Natural',
      logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200',
      industry: 'Retail',
      contractDate: '2023-05-10T00:00:00Z'
    }
  ]
};