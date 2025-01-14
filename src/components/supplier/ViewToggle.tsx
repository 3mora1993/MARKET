import React from 'react';
import { Eye, Layout } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface ViewToggleProps {
  supplierId: string;
}

export function ViewToggle({ supplierId }: ViewToggleProps) {
  const location = useLocation();
  const isPublicView = location.pathname.includes('/public');

  return (
    <Link
      to={isPublicView ? `/supplier/${supplierId}` : `/supplier/${supplierId}/public`}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      {isPublicView ? (
        <>
          <Layout className="w-4 h-4" />
          Switch to Dashboard
        </>
      ) : (
        <>
          <Eye className="w-4 h-4" />
          View Public Profile
        </>
      )}
    </Link>
  );
}