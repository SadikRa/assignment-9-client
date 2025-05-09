/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  isDeleted: boolean;
  isCompleteProfile: boolean;
  user: User;
  reviews: any[];
  votes: any[];
  ReviewComment: any[];
  Payment: any[];
}

export interface User {
  id: string;
  name: string;
  accountId: string;
  profileImage: any;
  bio: any;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
