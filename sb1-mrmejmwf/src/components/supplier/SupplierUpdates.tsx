import React, { useState } from 'react';
import { Bell, Tag, Calendar, Plus } from 'lucide-react';
import { CreateUpdate } from './CreateUpdate';
import type { Update } from '../../types/updates';

interface SupplierUpdatesProps {
  updates: Update[];
}

export function SupplierUpdates({ updates: initialUpdates }: SupplierUpdatesProps) {
  const [updates, setUpdates] = useState(initialUpdates);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getUpdateIcon = (type: Update['type']) => {
    switch (type) {
      case 'new_product':
        return <Tag className="w-5 h-5 text-green-600" />;
      case 'promotion':
        return <Bell className="w-5 h-5 text-blue-600" />;
      case 'announcement':
        return <Calendar className="w-5 h-5 text-purple-600" />;
    }
  };

  const getUpdateClass = (type: Update['type']) => {
    switch (type) {
      case 'new_product':
        return 'border-green-100 bg-green-50';
      case 'promotion':
        return 'border-blue-100 bg-blue-50';
      case 'announcement':
        return 'border-purple-100 bg-purple-50';
    }
  };

  const handleCreateUpdate = async (newUpdate: Omit<Update, 'id' | 'date'>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const update: Update = {
      ...newUpdate,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };

    setUpdates(prev => [update, ...prev]);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Latest Updates</h3>
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Update
          </button>
        )}
      </div>

      {showCreateForm && (
        <CreateUpdate
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateUpdate}
        />
      )}

      <div className="space-y-3">
        {updates.map((update) => (
          <div
            key={update.id}
            className={`p-3 rounded-lg border ${getUpdateClass(update.type)}`}
          >
            <div className="flex items-start gap-3">
              {getUpdateIcon(update.type)}
              <div className="flex-1">
                <h4 className="font-medium">{update.title}</h4>
                <p className="text-sm text-gray-600">{update.description}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {new Date(update.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}