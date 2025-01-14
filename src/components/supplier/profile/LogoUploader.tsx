import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface LogoUploaderProps {
  currentLogo: string;
  onUpload: (file: File) => Promise<void>;
}

export function LogoUploader({ currentLogo, onUpload }: LogoUploaderProps) {
  const [preview, setPreview] = useState<string>(currentLogo);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    try {
      await onUpload(file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative w-32 h-32 mx-auto">
        <img
          src={preview}
          alt="Company Logo"
          className="w-full h-full object-cover rounded-lg"
        />
        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
          <input
            type="file"
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
            disabled={isUploading}
          />
          <div className="text-white text-center">
            <Upload className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm">
              {isUploading ? 'Uploading...' : 'Change Logo'}
            </span>
          </div>
        </label>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Click the image to upload a new logo
      </p>
    </div>
  );
}