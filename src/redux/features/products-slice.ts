// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// // -------------------------- INTERFACE --------------------------
// interface ProductsState {
//   products: ProductData[];
//   isLoading: boolean;
//   error: any;
// }

// interface CategoryProduct {
//   currentPage: number;
//   items: ProductData[];
//   pageSize: number;
//   totalElements: number;
//   totalPages: number;
// }

// interface ProductData {
//   productId: number;
//   name: string;
//   quantity: number;
//   description: string;
//   price: number;
//   ratingScrore: number;
//   rateTotal: number;
//   categoryDto: {
//     categoryId: number;
//     name: string;
//     imagePath: string;
//     deletedAt: null;
//     quantityProduct: null;
//   };
//   createdAt: string;
//   deletedAt: null;
//   inWishList: false;
//   imagePath: string;
//   imagesPath: [];
// }

// // -------------------------- VAR --------------------------
// const initialState: ProductsState = {
//   products: [],
//   isLoading: false,
//   error: null,
// };

// // -------------------------- FUNCTION --------------------------
// // Get Products from API
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (thunkAPI: string) => {
//     const response = await fetch(thunkAPI);
//     const result = (await response.json()) as CategoryProduct;
//     const products = result.items;
//     return products;
//   }
// );

// // -------------------------- REDUX --------------------------
// export const products = createSlice({
//   name: "products",
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(fetchProducts.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchProducts.fulfilled, (state, action) => {
//       state.products = action.payload;
//       state.isLoading = false;
//     });
//     builder.addCase(fetchProducts.rejected, (state, action) => {
//       state.error = action.error;
//       state.isLoading = false;
//     });
//   },
// });

// export default products.reducer;
