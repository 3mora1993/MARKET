import React from 'react';
import { MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SupplierCardProps {
  supplier: {
    id: string;
    name: string;
    avatar: string;
    location?: string;
    responseRate?: number;
    avgResponseTime?: string;
    isVerified?: boolean;
  };
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <Link 
        to={`/supplier/${supplier.id}`}
        className="flex items-center gap-3 mb-4"
      >
        <img
          src={supplier.avatar}
          alt={supplier.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">{supplier.name}</h3>
            {supplier.isVerified && (
              <CheckCircle className="w-4 h-4 text-blue-600" />
            )}
          </div>
          {supplier.location && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{supplier.location}</span>
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-2">
        {supplier.responseRate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Response Rate</span>
            <span className="font-medium">{supplier.responseRate}%</span>
          </div>
        )}
        {supplier.avgResponseTime && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Avg. Response Time</span>
            <span className="font-medium">{supplier.avgResponseTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}