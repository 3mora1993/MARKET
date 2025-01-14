import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MessageList } from './MessageList';
import { MessageThread } from './MessageThread';
import { MessageComposer } from './MessageComposer';
import type { ChatThread } from '../../types/messaging';

interface MessageCenterProps {
  onClose: () => void;
}

export function MessageCenter({ onClose }: MessageCenterProps) {
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Message List - Left Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <MessageList
            onThreadSelect={setActiveThread}
            activeThreadId={activeThread?.id}
          />
        </div>

        {/* Message Thread - Main Content */}
        <div className="flex-1 flex flex-col">
          {activeThread ? (
            <>
              <MessageThread thread={activeThread} />
              <MessageComposer threadId={activeThread.id} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}