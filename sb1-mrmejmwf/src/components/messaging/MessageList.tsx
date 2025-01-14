import React from 'react';
import { Search, Plus } from 'lucide-react';
import type { ChatThread } from '../../types/messaging';

interface MessageListProps {
  onThreadSelect: (thread: ChatThread) => void;
  activeThreadId?: string;
}

// Mock data - In real app, fetch from API
const MOCK_THREADS: ChatThread[] = [
  {
    id: '1',
    participant: {
      id: 'u1',
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      company: 'Tech Solutions Inc.',
      online: true,
      typing: true
    },
    messages: [
      {
        id: 'm1',
        content: 'Are you interested in our new products?',
        timestamp: new Date().toISOString(),
        senderId: 'u1',
        attachments: [],
        read: true
      },
      {
        id: 'm2',
        content: 'We have some great offers this month.',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        senderId: 'current-user',
        attachments: [],
        read: true
      }
    ],
    lastMessage: {
      id: 'm1',
      content: 'Are you interested in our new products?',
      timestamp: new Date().toISOString(),
      senderId: 'u1',
      attachments: []
    },
    unreadCount: 2
  },
  {
    id: '2',
    participant: {
      id: 'u2',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      company: 'Global Trade Co.',
      online: false
    },
    messages: [
      {
        id: 'm3',
        content: 'Thank you for your inquiry',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        senderId: 'current-user',
        attachments: [],
        read: true
      }
    ],
    lastMessage: {
      id: 'm3',
      content: 'Thank you for your inquiry',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      senderId: 'current-user',
      attachments: []
    },
    unreadCount: 0
  }
];

export function MessageList({ onThreadSelect, activeThreadId }: MessageListProps) {
  return (
    <>
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="search"
            placeholder="Search messages..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {MOCK_THREADS.map((thread) => (
          <button
            key={thread.id}
            onClick={() => onThreadSelect(thread)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
              activeThreadId === thread.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="relative">
              <img
                src={thread.participant.avatar}
                alt={thread.participant.name}
                className="w-10 h-10 rounded-full"
              />
              {thread.participant.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-medium truncate">{thread.participant.name}</p>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(thread.lastMessage.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {thread.participant.company}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {thread.lastMessage.content}
              </p>
            </div>
            {thread.unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                {thread.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 border-t">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          New Message
        </button>
      </div>
    </>
  );
}