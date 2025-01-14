import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FeedPage } from './pages/FeedPage';
import { SupplierProfile } from './pages/SupplierProfile';
import { PublicSupplierProfile } from './pages/PublicSupplierProfile';
import { ProductDetails } from './pages/ProductDetails';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { SupplierDashboard } from './pages/SupplierDashboard';
import { Header } from './components/layout/Header';
import { ChatWidget } from './components/chat/ChatWidget';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/feed" replace />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/supplier/:id" element={<SupplierProfile />} />
            <Route path="/supplier/:id/public" element={<PublicSupplierProfile />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/supplier/insights" element={<SupplierDashboard />} />
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          </Routes>
        </main>
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}