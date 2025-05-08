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
  moderationNote: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  votes: Vote[];
  ReviewComment: ReviewComment[];
  account: Account;
}

export interface Vote {
  id: string;
  reviewId: string;
  accountId: string;
  upVote: number;
  downVote: number;
  createdAt: string;
  updatedAt: string;
  review?: {
    title: string;
    imageUrl?: string;
  };
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
