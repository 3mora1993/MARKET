import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, MessageSquare, Globe2 } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { MessageCenter } from '../messaging/MessageCenter';
import { ProfileMenu } from './ProfileMenu';
import type { SearchFiltersState } from '../../types/search';

export function Header() {
  const [showMessages, setShowMessages] = useState(false);

  const handleSearch = (query: string, filters: SearchFiltersState) => {
    console.log('Search:', { query, filters });
    // Implement search logic here
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <Link 
              to="/feed" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Globe2 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">WorldMart</span>
            </Link>
            
            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setShowMessages(true)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <MessageSquare className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              
              <ProfileMenu
                avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
                name="John Doe"
                role="Buyer & Supplier"
              />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden px-4 pb-3">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      {/* Message Center Modal */}
      {showMessages && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMessages(false)} />
          <div className="absolute inset-4 bg-white rounded-lg shadow-xl overflow-hidden">
            <MessageCenter onClose={() => setShowMessages(false)} />
          </div>
        </div>
      )}
    </>
  );
}