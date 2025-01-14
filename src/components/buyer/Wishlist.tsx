import React from 'react';
import { Heart, Trash2, ExternalLink } from 'lucide-react';
import type { WishlistItem } from '../../types/buyer';

const MOCK_WISHLIST: WishlistItem[] = [
  {
    id: '1',
    product: {
      id: 'p1',
      name: 'Organic Whole Grain Pasta',
      image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&q=80&w=800',
      price: { min: 3.99, max: 4.99 }
    },
    supplier: {
      id: 's1',
      name: 'Organic Foods Co.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    },
    addedAt: '2024-03-20T10:00:00Z'
  }
];

export function Wishlist() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-600" />
          Wishlist
        </h2>
      </div>

      <div className="divide-y">
        {MOCK_WISHLIST.map((item) => (
          <div key={item.id} className="p-4">
            <div className="flex gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <img
                        src={item.supplier.avatar}
                        alt={item.supplier.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm text-gray-600">
                        {item.supplier.name}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-green-600 mt-1">
                      ${item.product.price.min.toFixed(2)} - ${item.product.price.max.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-red-50 rounded-full text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-blue-50 rounded-full text-blue-600">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}