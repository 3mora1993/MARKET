import React, { useState } from 'react';
import { Send, X, Minimize2, Maximize2 } from 'lucide-react';
import type { ChatContact } from '../../types/chat';

interface ChatWindowProps {
  contact: ChatContact;
  onClose: () => void;
  onMinimize: () => void;
}

export function ChatWindow({ contact, onClose, onMinimize }: ChatWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    onMinimize();
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className={`fixed bottom-0 right-72 w-64 bg-white rounded-t-lg shadow-lg flex flex-col
      ${isMinimized ? 'h-10' : 'h-80'}`}>
      {/* Slimmer header */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-6 h-6 rounded-full"
            />
            {contact.online && (
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          <span className="text-sm font-medium">{contact.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleMinimize}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-3">
            {/* Messages will go here */}
          </div>

          <div className="p-2 border-t">
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 px-2 py-1.5 text-sm border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}