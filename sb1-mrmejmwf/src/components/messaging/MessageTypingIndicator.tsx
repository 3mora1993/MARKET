import React from 'react';

interface MessageTypingIndicatorProps {
  name: string;
}

export function MessageTypingIndicator({ name }: MessageTypingIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span>{name} is typing...</span>
    </div>
  );
}