import React from 'react';
import { MessageSquare } from 'lucide-react';
import type { ChatContact } from '../../types/chat';

interface ChatListProps {
  contacts: ChatContact[];
  onSelectContact: (contact: ChatContact) => void;
}

export function ChatList({ contacts, onSelectContact }: ChatListProps) {
  return (
    <div className="fixed bottom-0 right-0 w-64 bg-white rounded-t-lg shadow-lg">
      {/* Slimmer header */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-medium">Messaging</span>
        </div>
      </div>

      {/* Compact contact list */}
      <div className="max-h-80 overflow-y-auto">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className="w-full p-2 flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-8 h-8 rounded-full"
              />
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{contact.name}</span>
                {contact.unreadCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full text-[10px]">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
              {contact.lastMessage && (
                <p className="text-xs text-gray-500 truncate">
                  {contact.lastMessage.content}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}