export interface Supplier {
  id: string;
  name: string;
  avatar: string;
}

export interface Inquiry {
  id: string;
  productName: string;
  supplier: Supplier;
  status: 'pending' | 'replied';
  message: string;
  date: string;
  lastReply?: string;
}

export interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    image: string;
    price: {
      min: number;
      max: number;
    };
  };
  supplier: Supplier;
  addedAt: string;
}

export interface Notification {
  id: string;
  type: 'message' | 'price_update' | 'order_update';
  title: string;
  description: string;
  date: string;
  read: boolean;
}