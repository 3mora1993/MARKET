import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import type { ChatMessage } from '../../types/messaging';

interface MessageGroupProps {
  messages: ChatMessage[];
  currentUserId: string;
}

export function MessageGroup({ messages, currentUserId }: MessageGroupProps) {
  return (
    <div className="space-y-2">
      {messages.map((message) => {
        const isSentByMe = message.senderId === currentUserId;
        
        return (
          <div
            key={message.id}
            className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                isSentByMe ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              <p>{message.content}</p>
              
              {message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className={`p-2 rounded ${
                        isSentByMe ? 'bg-blue-700' : 'bg-gray-200'
                      }`}
                    >
                      {attachment.type.startsWith('image/') ? (
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          className="max-h-48 rounded"
                        />
                      ) : (
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm"
                        >
                          📎 {attachment.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <div className={`text-xs mt-1 flex items-center gap-1 ${
                isSentByMe ? 'text-blue-200' : 'text-gray-500'
              }`}>
                <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                {isSentByMe && (
                  message.read ? (
                    <CheckCheck className="w-4 h-4" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}