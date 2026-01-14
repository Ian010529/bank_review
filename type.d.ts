export type VibeType = 'positive' | 'neutral' | 'negative';

export type UserType =
  | 'individual customer'
  | 'business'
  | 'bank employee'
  | 'former employee'
  | 'investor'
  | 'other';

export interface Review {
  _id: string;
  vibe: VibeType;
  companyName: string;
  isAnonymous: boolean;
  userType: UserType;
  name?: string;
  title: string;
  story: string;
  createdAt: string;
  updatedAt: string;
}

export type CompanyType = {
  _id: string;
  name: string;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  totalReviews: number;
  reviews: Review[];
  complaintRate: number;
};
