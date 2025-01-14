import React from 'react';
import { LogoUploader } from './LogoUploader';
import { CompanyInfoForm } from './CompanyInfoForm';
import type { Supplier } from '../../../types/supplier';

interface ProfileEditorProps {
  supplier: Supplier;
  onSave: (data: Partial<Supplier>) => Promise<void>;
  onLogoUpload: (file: File) => Promise<void>;
}

export function ProfileEditor({ supplier, onSave, onLogoUpload }: ProfileEditorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Edit Company Profile</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <LogoUploader
            currentLogo={supplier.avatar}
            onUpload={onLogoUpload}
          />
        </div>
        
        <div className="md:col-span-2">
          <CompanyInfoForm
            supplier={supplier}
            onSave={onSave}
          />
        </div>
      </div>
    </div>
  );
}