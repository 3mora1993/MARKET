import React from 'react';
import { Modal } from '../common/Modal';
import { RFQForm } from './RFQForm';
import type { RFQFormData } from '../../types/rfq';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

export function RFQModal({ isOpen, onClose, productId, productName }: RFQModalProps) {
  const handleSubmit = async (data: RFQFormData) => {
    try {
      // TODO: Implement RFQ submission to Supabase
      console.log('Submitting RFQ:', { productId, ...data });
      onClose();
    } catch (error) {
      console.error('Failed to submit RFQ:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Request Quote - ${productName}`}
    >
      <RFQForm onSubmit={handleSubmit} productId={productId} />
    </Modal>
  );
}