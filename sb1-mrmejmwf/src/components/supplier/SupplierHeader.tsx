import React, { useState } from 'react';
import { type Supplier } from '../../types/supplier';
import { MapPin, Mail, Phone, Calendar, Pencil } from 'lucide-react';
import { Modal } from '../common/Modal';
import { ProfileEditor } from './profile/ProfileEditor';

interface SupplierHeaderProps {
  supplier: Supplier;
}

export function SupplierHeader({ supplier }: SupplierHeaderProps) {
  const [showEditor, setShowEditor] = useState(false);

  const handleSave = async (data: Partial<Supplier>) => {
    // Implement save logic here
    console.log('Saving:', data);
    setShowEditor(false);
  };

  const handleLogoUpload = async (file: File) => {
    // Implement logo upload logic here
    console.log('Uploading logo:', file);
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={supplier.avatar}
            alt={supplier.name}
            className="w-32 h-32 rounded-lg object-cover"
          />
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{supplier.name}</h1>
              <button
                onClick={() => setShowEditor(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">{supplier.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{supplier.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5" />
                <a href={`mailto:${supplier.contactEmail}`} className="text-blue-600 hover:underline">
                  {supplier.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Joined {new Date(supplier.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        title="Edit Company Profile"
      >
        <ProfileEditor
          supplier={supplier}
          onSave={handleSave}
          onLogoUpload={handleLogoUpload}
        />
      </Modal>
    </>
  );
}