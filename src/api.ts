export const bestSellingApi =
  "https://g5-likelion-ecommerce.onrender.com/api/product/public/best-selling";

export const newArrivalApi =
  "https://g5-likelion-ecommerce.onrender.com/api/product/public/new-arrival";

export const bannersApi =
  "https://g5-likelion-ecommerce.onrender.com/api/banner-images/public/all";

export const categoriesApi =
  "https://g5-likelion-ecommerce.onrender.com/api/categories/public/all";

export const brandsApi =
  "https://g5-likelion-ecommerce.onrender.com/api/brand/public/all";

export const getProductsByCategoryApi = (
  categoryId: number,
  pageSize: number = 10,
  pageNumber: number = 1
) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/product/public/${categoryId}/paginate?page=${pageNumber}&pageSize=${pageSize}`;
};

export const getProductsExcludeApi = (
  categoryId: number,
  productIdExclude: number,
  pageSize: number = 4
) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/product/public/${categoryId}/exclude?pageSize=${pageSize}&productIdNotInclude=${productIdExclude}`;
};

export const getProductDetailApi = (productId: number) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/product/public/${productId}`;
};

export const getProductReviewsApi = (productId: number) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/product-rate/public/${productId}`;
};

export const getProductReviewSummaryApi = (productId: number) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/product-rate/public/group/${productId}`;
};

export const signInApi =
  "https://g5-likelion-ecommerce.onrender.com/api/auth/signin";

export const signUpApi =
  "https://g5-likelion-ecommerce.onrender.com/api/auth/signup";

export const getUserDetailApi = (accountId: number) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/user/get-details/${accountId}`;
};

export const signOutApi =
  "https://g5-likelion-ecommerce.onrender.com/api/auth/signout";

export const forgotPasswordApi =
  "https://g5-likelion-ecommerce.onrender.com/api/public/forgot-password";

export const getCartApi =
  "https://g5-likelion-ecommerce.onrender.com/api/cart/get-by-account";

export const createCartApi =
  "https://g5-likelion-ecommerce.onrender.com/api/cart/create";

export const updateCartApi =
  "https://g5-likelion-ecommerce.onrender.com/api/cart/update";

export const getTotalCartItems =
  "https://g5-likelion-ecommerce.onrender.com/api/cart/get-total-items";

export const getTotalCartPrice =
  "https://g5-likelion-ecommerce.onrender.com/api/cart/get-total-price";

export const deleteCartItemApi = (cartId: number) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/cart/delete/${cartId}`;
};

export const createOrderApi =
  "https://g5-likelion-ecommerce.onrender.com/api/order";

export const getOrderApi = (accountId: number) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/order/by-accountID/${accountId}`;
};

export const findCouponApi = (code: string) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/coupon/find-by-code?code=${code}`;
};

export const updateCouponApi =
  "https://g5-likelion-ecommerce.onrender.com/api/coupon/update";

export const paypalApi =
  "https://g5-likelion-ecommerce.onrender.com/api/payment/create";
