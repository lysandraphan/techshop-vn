// Display formatted price
export const displayPrice = (price: number) => {
  return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Get Token saved in Cookie
const getCookie = (name: string) => {
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts && parts.length === 2) return parts.pop()?.split(";").shift();
  }
};
export const getToken = getCookie("token");

// Get Product Detail Route
export const getProductRoute = (
  categoryName: string,
  categoryId: number,
  productId: number
) => {
  categoryName = categoryName.toLocaleLowerCase().replace(/ /g, "-");
  return `/categories/${categoryName}/${categoryId}/products/${productId}`;
};
