export interface ReviewData {
  id: number;
  productId: number;
  accountId: number;
  userFullname: string;
  avatar: string;
  score: number;
  comment: string;
  rateTime: Date;
}
