import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  mainImage: string;
  images?: string[];
  title: string;
}

export function ProductGallery({ mainImage, images = [], title }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(mainImage);
  const allImages = [mainImage, ...(images || [])];

  return (
    <div className="space-y-4">
      <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
        <img
          src={currentImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {allImages.length > 1 && (
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(img)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 
                  ${currentImage === img ? 'border-blue-600' : 'border-transparent'}`}
              >
                <img
                  src={img}
                  alt={`${title} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}