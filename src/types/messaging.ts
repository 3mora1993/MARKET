export interface ChatParticipant {
  id: string;
  name: string;
  avatar: string;
  company: string;
  online?: boolean;
  typing?: boolean;
}

export interface ChatAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  attachments: ChatAttachment[];
  read?: boolean;
}

export interface ChatThread {
  id: string;
  participant: ChatParticipant;
  messages: ChatMessage[];
  lastMessage: ChatMessage;
  unreadCount: number;
}