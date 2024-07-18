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
  pageNumber: number = 1
) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/product/public/${categoryId}/paginate?page=${pageNumber}`;
};

export const getProductDetailApi = (productId: number) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/product/public/${productId}`;
};

export const getProductReviews = (productId: number) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/product-rate/public/${productId}`;
};

export const getProductReviewSummary = (productId: number) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/product-rate/public/group/${productId}`;
};
