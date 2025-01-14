import React from 'react';
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { MessageGroup } from './MessageGroup';
import { MessageTypingIndicator } from './MessageTypingIndicator';
import type { ChatThread, ChatMessage } from '../../types/messaging';

interface MessageThreadProps {
  thread: ChatThread;
}

// Group messages by date
function groupMessagesByDate(messages: ChatMessage[]) {
  return messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, ChatMessage[]>);
}

export function MessageThread({ thread }: MessageThreadProps) {
  const messageGroups = groupMessagesByDate(thread.messages);

  return (
    <>
      {/* Thread Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
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
          <div>
            <h3 className="font-medium">{thread.participant.name}</h3>
            <p className="text-sm text-gray-600">
              {thread.participant.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {Object.entries(messageGroups).map(([date, messages]) => (
            <div key={date}>
              <div className="flex items-center justify-center mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {date}
                </span>
              </div>
              <MessageGroup messages={messages} currentUserId="current-user" />
            </div>
          ))}
        </div>
        
        {thread.participant.typing && (
          <MessageTypingIndicator name={thread.participant.name} />
        )}
      </div>
    </>
  );
}