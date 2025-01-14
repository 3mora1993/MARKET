import React from 'react';
import { type Client } from '../../types/supplier';
import { ClientCard } from './ClientCard';
import { Building } from 'lucide-react';

interface NotableClientsProps {
  clients: Client[];
}

export function NotableClients({ clients }: NotableClientsProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Building className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Notable Clients</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}