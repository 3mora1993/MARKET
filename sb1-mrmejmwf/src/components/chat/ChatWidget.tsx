import React, { useState } from 'react';
import { MessageCircle, X, Maximize2, Minimize2 } from 'lucide-react';
import { MessageList } from '../messaging/MessageList';
import { MessageThread } from '../messaging/MessageThread';
import { MessageComposer } from '../messaging/MessageComposer';
import type { ChatThread } from '../../types/messaging';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
      isMinimized ? 'w-72 h-16' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
        <h3 className="font-medium">Messages</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-blue-700 rounded"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-blue-700 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-col h-[calc(100%-64px)]">
          {activeThread ? (
            <>
              <div className="flex-1 overflow-hidden">
                <MessageThread thread={activeThread} />
              </div>
              <MessageComposer threadId={activeThread.id} />
            </>
          ) : (
            <div className="flex-1 overflow-hidden">
              <MessageList
                onThreadSelect={setActiveThread}
                activeThreadId={activeThread?.id}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}