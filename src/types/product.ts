export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  companyId: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  title: string;
  description: string;
  rating: number;
  categoryId: string;
  productId: string;
  purchaseSource: string;
  images: string;
  isPremium: boolean;
  accountId: string;
  status: string;
  moderationNote: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  account: Account;
  votes: Vote[];
  ReviewComment: ReviewComment[];
}

export interface Vote {
  id: string;
  reviewId: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewComment {
  id: string;
  reviewId: string;
  accountId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface Account {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  isDeleted: boolean;
  isCompleteProfile: boolean;
}
