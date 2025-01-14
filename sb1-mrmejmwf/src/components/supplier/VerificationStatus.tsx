import React from 'react';
import { type VerificationStatus } from '../../types/supplier';
import { CheckCircle, AlertCircle, Clock, FileCheck, Calendar } from 'lucide-react';

interface VerificationStatusProps {
  verification: VerificationStatus;
}

export function VerificationStatus({ verification }: VerificationStatusProps) {
  const getStatusColor = (status: VerificationStatus['documentStatus']) => {
    switch (status) {
      case 'verified':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'expired':
        return 'text-red-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FileCheck className="w-5 h-5 text-blue-600" />
        Verification Status
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle className={`w-5 h-5 ${verification.isVerified ? 'text-green-600' : 'text-gray-400'}`} />
          <span className="text-gray-700">
            {verification.isVerified ? 'Verified Supplier' : 'Verification Pending'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <AlertCircle className={`w-5 h-5 ${verification.taxAuthorityVerified ? 'text-green-600' : 'text-gray-400'}`} />
          <span className="text-gray-700">
            {verification.taxAuthorityVerified ? 'Tax Authority Verified' : 'Tax Verification Pending'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${getStatusColor(verification.documentStatus)}`} />
          <span className="text-gray-700">
            Document Status: <span className="font-medium capitalize">{verification.documentStatus}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">
            Last Updated: {new Date(verification.lastDocumentUpdate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}