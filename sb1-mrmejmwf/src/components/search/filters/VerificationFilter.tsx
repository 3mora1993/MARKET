import React from 'react';
import { Shield } from 'lucide-react';

interface VerificationFilterProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function VerificationFilter({ value, onChange }: VerificationFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Verified Suppliers Only
      </label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    </div>
  );
}