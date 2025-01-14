export interface RFQFormData {
  quantity: string;
  deliveryDate: string;
  deliveryLocation: string;
  specifications: string;
  attachments: File[];
}

export interface RFQ extends RFQFormData {
  id: string;
  productId: string;
  buyerId: string;
  supplierId: string;
  status: 'pending' | 'quoted' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  id: string;
  rfqId: string;
  unitPrice: number;
  totalPrice: number;
  deliveryTime: string;
  validUntil: string;
  terms: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}