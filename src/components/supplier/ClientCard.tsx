import React from 'react';
import { type Client } from '../../types/supplier';
import { Calendar, Building2 } from 'lucide-react';

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
      <div className="flex items-center gap-4 mb-3">
        <img
          src={client.logo}
          alt={client.name}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{client.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="w-4 h-4" />
            <span>{client.industry}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Since {new Date(client.contractDate).getFullYear()}</span>
          </div>
        </div>
      </div>
      {client.testimonial && (
        <blockquote className="text-sm text-gray-600 italic border-l-4 border-blue-600 pl-3 mt-2">
          "{client.testimonial}"
        </blockquote>
      )}
    </div>
  );
}