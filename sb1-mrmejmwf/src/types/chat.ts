export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  online: boolean;
}