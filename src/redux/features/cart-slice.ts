import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// internal
import { createCartApi, getCartApi } from "@/api";
import { getToken } from "@/utils/functions";
import axios from "axios";

// -------------------------- INTERFACE --------------------------
export interface CartState {
  cart: CartItemData[] | null | undefined;
  total: number;
  isLoading: boolean;
  error: any;
}

interface ServerData {
  message: string;
  data: CartItemData[] | null;
}

export interface CartItemData {
  accountId: number;
  cartId: number;
  product: CartProduct;
}

export interface CartProduct {
  imagePath: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
}

// -------------------------- VAR --------------------------
const initialState: CartState = {
  cart: undefined,
  total: 0,
  isLoading: false,
  error: null,
};

const abortController = new AbortController();

// -------------------------- FUNCTION --------------------------
// Count total items in Cart
export const getTotalCart = (cartItems: CartItemData[] | undefined) => {
  if (cartItems) {
    const totalItems = cartItems.reduce((total, cartItem) => {
      return total + cartItem.product.quantity;
    }, 0);
    return totalItems;
  } else {
    return 0;
  }
};

// Get Cart from API
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ accountId }: { accountId: number }) => {
    const token = getToken;
    if (token) {
      try {
        const response = await axios.get(getCartApi(accountId), {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = (await response.data) as ServerData;
        const cart = result.data as CartItemData[];
        return cart;
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }
);

// Post - Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    productId,
    accountId,
  }: {
    productId: number;
    accountId: number;
  }) => {
    const token = getToken;
    if (token) {
      try {
        await axios.post(
          createCartApi,
          {
            productId,
            quantity: 1,
          },
          {
            signal: abortController.signal,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Fetch it after
        const response = await axios.get(getCartApi(accountId), {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = (await response.data) as ServerData;
        const cart = result.data as CartItemData[];
        return cart;
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }
);

// -------------------------- REDUX --------------------------
export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.total = getTotalCart(action.payload);
      state.isLoading = false;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.total = getTotalCart(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default cart.reducer;
