/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IReviews {
  id: string;
  title: string;
  rating: number;
  productId: string;
  purchaseSource: string;
  premiumPrice: number;
  previewContent: string;
  fullContent: string;
  images: string[];
  isPremium: boolean;
  accountId: string;
  status: string;
  moderationNote: any;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  product: Product;
  account: Account;
  _count: Count;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: any;
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  companyId: any;
}

export interface Account {
  id: string;
  email: string;
}

export interface Count {
  votes: number;
  ReviewComment: number;
}
