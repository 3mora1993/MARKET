import React from 'react';
import { MapPin } from 'lucide-react';

const LOCATIONS = [
  'All Locations',
  'North America',
  'Europe',
  'Asia',
  'South America',
  'Africa',
  'Australia'
];

interface LocationFilterProps {
  selected: string;
  onChange: (location: string) => void;
}

export function LocationFilter({ selected, onChange }: LocationFilterProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Location
      </label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {LOCATIONS.map(location => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}