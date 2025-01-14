import React from 'react';
import { Bell, MessageSquare, Package, Tag } from 'lucide-react';
import type { Notification } from '../../types/buyer';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New Message',
    description: 'Organic Foods Co. has replied to your inquiry',
    date: '2024-03-20T10:00:00Z',
    read: false
  },
  {
    id: '2',
    type: 'price_update',
    title: 'Price Drop Alert',
    description: 'Premium Coffee Beans price has been reduced by 10%',
    date: '2024-03-19T15:30:00Z',
    read: true
  }
];

export function NotificationCenter() {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'price_update':
        return <Tag className="w-5 h-5 text-green-600" />;
      case 'order_update':
        return <Package className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          Notifications
        </h2>
      </div>

      <div className="divide-y">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 ${notification.read ? '' : 'bg-blue-50'}`}
          >
            <div className="flex gap-3">
              {getIcon(notification.type)}
              <div className="flex-1">
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.description}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {new Date(notification.date).toLocaleDateString()}
                </span>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}