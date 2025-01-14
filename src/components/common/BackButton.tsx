import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back to Feed</span>
    </button>
  );
}