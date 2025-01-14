import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  
  const getBreadcrumbName = (path: string) => {
    switch (path) {
      case 'feed': return 'Product Feed';
      case 'product': return 'Product Details';
      case 'supplier': return 'Supplier Profile';
      case 'buyer': return 'Buyer';
      case 'dashboard': return 'Dashboard';
      case 'insights': return 'Insights';
      default: return path.charAt(0).toUpperCase() + path.slice(1);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <Link to="/" className="hover:text-blue-600">
        <Home className="w-4 h-4" />
      </Link>
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <ChevronRight className="w-4 h-4" />
          {index === paths.length - 1 ? (
            <span className="font-medium text-gray-900">
              {getBreadcrumbName(path)}
            </span>
          ) : (
            <Link
              to={`/${paths.slice(0, index + 1).join('/')}`}
              className="hover:text-blue-600"
            >
              {getBreadcrumbName(path)}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}