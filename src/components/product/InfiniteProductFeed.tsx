import React, { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Loader } from 'lucide-react';
import type { Product } from '../../types/product';

// Import mock data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Organic Whole Grain Pasta',
    description: 'Premium quality organic pasta made from 100% whole grain wheat. Perfect for healthy and delicious meals.',
    barcode: '890123456789',
    priceRange: {
      min: 3.99,
      max: 4.99
    },
    moq: 100,
    quantity: 500,
    expiryDate: '2024-12-31',
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&q=80&w=800',
    supplier: {
      id: 's1',
      name: 'Organic Foods Co.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
      phone: '+972507227335'
    },
    category: 'Pasta & Grains',
    createdAt: '2024-03-15T10:00:00Z',
    isNew: true
  },
  {
    id: '2',
    title: 'Premium Coffee Beans',
    description: 'Single-origin Arabica coffee beans, medium roast. Rich flavor with notes of chocolate and caramel.',
    barcode: '890123456790',
    priceRange: {
      min: 12.99,
      max: 15.99
    },
    moq: 50,
    quantity: 200,
    expiryDate: '2024-09-30',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
    supplier: {
      id: 's2',
      name: 'Global Coffee Traders',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      phone: '+972507227335'
    },
    category: 'Beverages',
    createdAt: '2024-03-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Organic Honey',
    description: 'Pure, raw organic honey sourced from local beekeepers. Perfect natural sweetener.',
    barcode: '890123456791',
    priceRange: {
      min: 8.99,
      max: 12.99
    },
    moq: 24,
    quantity: 150,
    expiryDate: '2025-06-30',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    supplier: {
      id: 's3',
      name: 'Nature\'s Best',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200',
      phone: '+972507227335'
    },
    category: 'Natural Sweeteners',
    createdAt: '2024-03-13T09:15:00Z'
  }
];

interface InfiniteProductFeedProps {
  onSupplierClick?: (supplierId: string) => void;
}

export function InfiniteProductFeed({ onSupplierClick }: InfiniteProductFeedProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Load initial data
  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
    setHasMore(false); // Disable infinite scroll for mock data
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const loadMore = async () => {
    setLoading(true);
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, fetch more products here
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  if (products.length === 0 && !loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        No products found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onSupplierClick={onSupplierClick}
          />
        ))}
      </div>
      
      <div ref={loaderRef} className="flex justify-center py-4">
        {loading && (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader className="w-5 h-5 animate-spin" />
            <span>Loading more products...</span>
          </div>
        )}
      </div>
    </div>
  );
}