// In your types/feed.ts
export type Post = {
  id: string;
  authorId: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  attachments: Array<{
    id: string;
    type: 'image' | 'document';
    url: string;
    name: string;
    size: string;
    mimeType: string;
  }>;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  type: 'product' | 'update'; // Allow "product" or "update" only
  createdAt: string;
  productDetails?: {  // productDetails is optional
    name: string;
    category: string;
    price: { min: number; max: number };
    moq: number;
    stock: number;
    expiryDate?: string;
    tags: string[];
  };
};
