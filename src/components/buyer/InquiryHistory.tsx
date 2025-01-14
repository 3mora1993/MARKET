import React from 'react';
import { MessageSquare, ExternalLink, Clock } from 'lucide-react';
import type { Inquiry } from '../../types/buyer';

const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: '1',
    productName: 'Organic Whole Grain Pasta',
    supplier: {
      id: 's1',
      name: 'Organic Foods Co.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    },
    status: 'replied',
    message: 'Interested in bulk order pricing for your organic pasta.',
    date: '2024-03-20T10:00:00Z',
    lastReply: 'Thank you for your interest. Our bulk pricing starts at...'
  },
  {
    id: '2',
    productName: 'Premium Coffee Beans',
    supplier: {
      id: 's2',
      name: 'Global Coffee Traders',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    status: 'pending',
    message: 'Requesting samples of your Arabica coffee beans.',
    date: '2024-03-19T15:30:00Z'
  }
];

export function InquiryHistory() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Recent Inquiries
        </h2>
      </div>

      <div className="divide-y">
        {MOCK_INQUIRIES.map((inquiry) => (
          <div key={inquiry.id} className="p-4">
            <div className="flex items-start gap-4">
              <img
                src={inquiry.supplier.avatar}
                alt={inquiry.supplier.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{inquiry.productName}</h3>
                    <p className="text-sm text-gray-600">{inquiry.supplier.name}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    inquiry.status === 'replied'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {inquiry.status === 'replied' ? 'Replied' : 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{inquiry.message}</p>
                {inquiry.lastReply && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm">
                    {inquiry.lastReply}
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(inquiry.date).toLocaleDateString()}
                  </span>
                  <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}