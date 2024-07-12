
export const bestSellingApi =
"https://g5-likelion-ecommerce.onrender.com/api/product/public/best-selling";

export const newArrivalApi =
"https://g5-likelion-ecommerce.onrender.com/api/product/public/new-arrival";

export const bannersApi =
  "https://g5-likelion-ecommerce.onrender.com/api/banner-images/public/all";

export const categoriesApi =
  "https://g5-likelion-ecommerce.onrender.com/api/categories/public/all";

export const getProductsByCategoryApi = (
  categoryId: number,
  pageNumber: number = 1
) => {
  return `https://g5-likelion-ecommerce.onrender.com/api/product/public/${categoryId}/paginate?page=${pageNumber}`;
};
