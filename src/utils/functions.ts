// Display formatted price
export const displayPrice = (price: number) => {
  return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Display formatted Date
export const formatDate = (date: string) => {
  date = new Date(Date.parse(date)).toDateString(); // format: Tue Jul 16 2024
  const tempDate = date.split(" ");
  const newDate = tempDate[1] + " " + tempDate[2] + ", " + tempDate[3];
  return newDate;
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
