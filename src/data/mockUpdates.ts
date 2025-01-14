import { type Update } from '../types/updates';

export const MOCK_UPDATES: Update[] = [
  {
    id: '1',
    type: 'new_product',
    title: 'New Organic Quinoa',
    description: 'Just added our premium organic quinoa from Peru',
    date: '2024-03-20T10:00:00Z'
  },
  {
    id: '2',
    type: 'promotion',
    title: 'Bulk Order Discount',
    description: '15% off on orders above 1000 units',
    date: '2024-03-19T15:30:00Z'
  }
];