export interface Post {
  id: string;
  authorId: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  attachments: Attachment[];
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  isBookmarked?: boolean;
  createdAt: string;
}

export interface Attachment {
  id: string;
  type: 'image' | 'document';
  url: string;
  name: string;
  size?: string;
  mimeType?: string;
  thumbnailUrl?: string;
}