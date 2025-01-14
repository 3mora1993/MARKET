import React, { useState } from 'react';
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';
import type { ChatContact } from '../../types/chat';

// Mock data
const MOCK_CONTACTS: ChatContact[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    unreadCount: 2,
    online: true,
    lastMessage: {
      id: 'm1',
      senderId: '1',
      receiverId: 'current-user',
      content: 'Are you interested in our new organic products?',
      timestamp: new Date().toISOString(),
      read: false,
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    unreadCount: 0,
    online: false,
    lastMessage: {
      id: 'm2',
      senderId: 'current-user',
      receiverId: '2',
      content: 'Thanks for the quick response!',
      timestamp: new Date().toISOString(),
      read: true,
    },
  },
];

export function ChatContainer() {
  const [activeChats, setActiveChats] = useState<ChatContact[]>([]);
  const [isChatListOpen, setIsChatListOpen] = useState(true);

  const handleSelectContact = (contact: ChatContact) => {
    if (!activeChats.find(chat => chat.id === contact.id)) {
      setActiveChats(prev => [...prev, contact].slice(-3)); // Maximum 3 chat windows
    }
    setIsChatListOpen(false);
  };

  const handleCloseChat = (contactId: string) => {
    setActiveChats(prev => prev.filter(chat => chat.id !== contactId));
  };

  const handleMinimizeChat = () => {
    // Handle minimize logic if needed
  };

  return (
    <div className="fixed bottom-0 right-0 flex items-end gap-2 pr-2">
      {activeChats.map((contact, index) => (
        <ChatWindow
          key={contact.id}
          contact={contact}
          onClose={() => handleCloseChat(contact.id)}
          onMinimize={handleMinimizeChat}
        />
      ))}
      {isChatListOpen && (
        <ChatList
          contacts={MOCK_CONTACTS}
          onSelectContact={handleSelectContact}
        />
      )}
    </div>
  );
}