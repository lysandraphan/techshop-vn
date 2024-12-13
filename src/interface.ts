export interface ProductData {
  productId: number;
  name: string;
  quantity: number;
  description: string;
  price: number;
  ratingScore: number;
  rateTotal: number;
  categoryDto: {
    categoryId: number;
    name: string;
    imagePath: string;
    deletedAt: null;
    quantityProduct: null;
  };
  brand: {
    id: number;
    name: string;
  };
  createdAt: string;
  deletedAt: null;
  inWishList: false;
  imagePath: string;
  imagesPath: [];
}

export interface ReviewData {
  id: number;
  productId: number;
  accountId: number;
  userFirstName: string;
  userLastName: string;
  avatar: string;
  score: number;
  comment: string;
  rateTime: string;
}

export interface ReviewSummaryData {
  [props: string]: number;
}

export interface OrderInfoData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  apartment: string;
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  city: string;
  region: string;
  country: string;
  orderDetailRequests: OrderSummaryData[];
  totalPrice: number;
  currency: string;
}

export interface OrderSummaryData {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderBillingInfoData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  apartment: string;
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  city: string;
  region: string;
  country: string;
}
