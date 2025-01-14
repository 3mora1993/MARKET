import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Barcode, Calendar, FileText, Award, Package } from 'lucide-react';
import { ProductGallery } from '../components/product/ProductGallery';
import { PricingSection } from '../components/product/PricingSection';
import { SupplierCard } from '../components/product/SupplierCard';
import { BackButton } from '../components/common/BackButton';
import { RFQModal } from '../components/rfq/RFQModal';

// Mock data - In a real app, this would come from an API
const MOCK_PRODUCT = {
  id: '1',
  title: 'Organic Whole Grain Pasta',
  description: 'Premium quality organic pasta made from 100% whole grain wheat. Perfect for healthy and delicious meals. Our pasta is crafted using traditional methods and the finest organic ingredients.',
  barcode: '890123456789',
  priceRange: {
    min: 3.99,
    max: 4.99
  },
  priceTiers: [
    { minQuantity: 100, price: 4.99 },
    { minQuantity: 500, price: 4.49 },
    { minQuantity: 1000, price: 3.99 }
  ],
  moq: 100,
  quantity: 5000,
  expiryDate: '2024-12-31',
  imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1612966948332-ea436faa4ef5?auto=format&fit=crop&q=80&w=800'
  ],
  supplier: {
    id: 's1',
    name: 'Organic Foods Co.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    phone: '+1555123456',
    responseRate: 98,
    avgResponseTime: '2.5 hours',
    isVerified: true,
    location: 'Portland, Oregon'
  },
  category: 'Pasta & Grains',
  createdAt: '2024-03-15T10:00:00Z',
  specifications: {
    'Type': 'Spaghetti',
    'Material': 'Whole Grain Wheat',
    'Origin': 'Italy',
    'Shelf Life': '24 months'
  },
  certifications: ['USDA Organic', 'Non-GMO Project Verified', 'Kosher'],
  packagingDetails: {
    type: 'Recyclable Cardboard Box',
    weight: '500g',
    dimensions: '20 × 5 × 5 cm'
  }
};

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRFQ, setShowRFQ] = useState(false);
  const product = MOCK_PRODUCT; // In real app, fetch based on id

  const whatsappLink = `https://wa.me/${product.supplier.phone}?text=Hi, I'm interested in ${product.title}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <BackButton onClick={() => navigate('/feed')} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Left Column - Gallery */}
        <ProductGallery
          mainImage={product.imageUrl}
          images={product.images}
          title={product.title}
        />

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <PricingSection
            priceTiers={product.priceTiers}
            moq={product.moq}
            quantity={product.quantity}
          />

          <div className="flex gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Contact via WhatsApp
            </a>
            <button 
              onClick={() => setShowRFQ(true)}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Quote
            </button>
          </div>

          <SupplierCard supplier={product.supplier} />

          {/* Product Details */}
          <div className="space-y-6">
            <div className="border rounded-lg divide-y">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <h3 className="font-medium">Specifications</h3>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-gray-600">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-gray-500" />
                  <h3 className="font-medium">Certifications</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-gray-500" />
                  <h3 className="font-medium">Packaging Details</h3>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <dt className="text-sm text-gray-600">Type</dt>
                    <dd className="font-medium">{product.packagingDetails.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Unit Weight</dt>
                    <dd className="font-medium">{product.packagingDetails.weight}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Dimensions</dt>
                    <dd className="font-medium">{product.packagingDetails.dimensions}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RFQModal
        isOpen={showRFQ}
        onClose={() => setShowRFQ(false)}
        productId={product.id}
        productName={product.title}
      />
    </div>
  );
}