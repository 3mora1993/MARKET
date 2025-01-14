import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../components/common/BackButton';
import { SupplierHeader } from '../components/supplier/SupplierHeader';
import { SupplierMetrics } from '../components/supplier/SupplierMetrics';
import { SupplierCategories } from '../components/supplier/SupplierCategories';
import { NotableClients } from '../components/supplier/NotableClients';
import { VerificationStatus } from '../components/supplier/VerificationStatus';
import { ProductFeed } from '../components/ProductFeed';
import { DocumentUpload } from '../components/supplier/DocumentUpload';
import { ProductList } from '../components/supplier/ProductList';
import { ContactForm } from '../components/supplier/ContactForm';
import { SupplierUpdates } from '../components/supplier/SupplierUpdates';
import { ViewToggle } from '../components/supplier/ViewToggle';
import { MOCK_SUPPLIERS } from '../data/mockSuppliers';
import { MOCK_UPDATES } from '../data/mockUpdates';

export function SupplierProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const supplier = id ? MOCK_SUPPLIERS[id] : null;

  if (!supplier) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Supplier not found</h2>
          <button
            onClick={() => navigate('/feed')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Return to Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <BackButton onClick={() => navigate('/feed')} />
        <ViewToggle supplierId={supplier.id} />
      </div>

      <SupplierHeader supplier={supplier} />
      <SupplierMetrics metrics={supplier.metrics} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <SupplierUpdates updates={MOCK_UPDATES} />
        </div>
        <div>
          <ContactForm supplierId={supplier.id} supplierName={supplier.name} />
        </div>
      </div>

      <VerificationStatus verification={supplier.verification} />
      <SupplierCategories categories={supplier.categories} />
      <DocumentUpload />
      <ProductList />
      <NotableClients clients={supplier.notableClients} />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <ProductFeed />
      </div>
    </div>
  );
}