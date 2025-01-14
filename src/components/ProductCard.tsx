import React from 'react';
import { Link } from 'react-router-dom';
import { type Product } from '../types/product';
import { ExternalLink, Barcode, MessageCircle, Calendar, Package2, Box } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSupplierClick?: (supplierId: string) => void;
}

export function ProductCard({ product, onSupplierClick }: ProductCardProps) {
  const whatsappLink = `https://wa.me/${product.supplier.phone}?text=Hi, I'm interested in ${product.title}`;
  
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {product.isNew && (
            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              New Arrival
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div 
          className="flex items-center gap-3 mb-3 cursor-pointer"
          onClick={() => onSupplierClick?.(product.supplier.id)}
        >
          <img
            src={product.supplier.avatar}
            alt={product.supplier.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900 hover:text-blue-600 text-sm">
              {product.supplier.name}
            </h3>
            <p className="text-xs text-gray-500">
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600">
            {product.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Barcode className="w-4 h-4" />
            <span className="font-mono">{product.barcode}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Box className="w-4 h-4" />
            <span>MOQ: {product.moq} units</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package2 className="w-4 h-4" />
            <span>{product.quantity} units available</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Expires: {new Date(product.expiryDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Price Range (USD)</span>
            <span className="text-lg font-bold text-green-600">
              ${product.priceRange.min.toFixed(2)} - ${product.priceRange.max.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="sm:hidden md:inline">WhatsApp</span>
            </a>
            <Link
              to={`/product/${product.id}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="sm:hidden md:inline">Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}