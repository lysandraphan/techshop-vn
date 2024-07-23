import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// internal
import {
  createCartApi,
  deleteCartItemApi,
  getCartApi,
  getTotalCartItems,
  getTotalCartPrice,
} from "@/api";
import { getToken } from "@/utils/functions";
import axios from "axios";

// -------------------------- INTERFACE --------------------------
export interface CartState {
  cart: CartItemData[] | null | undefined;
  totalCartItems: number;
  totalPrice: number;
  isLoading: boolean;
  isLoadingRemove: boolean;
  removingCartId: number;
  error: any;
}

interface ServerData {
  message: string;
  data: CartItemData[] | null;
}

export interface CartItemData {
  accountId: number;
  cartId: number;
  product: CartProductData;
  totalItems: number;
  totalPrice: number;
}

export interface CartProductData {
  imagePath: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  categoryDto: {
    categoryId: number;
    name: string;
    imagePath: string;
    deleteAt: string | null;
    quantityProduct: number | null;
  };
}

// -------------------------- VAR --------------------------
const initialState: CartState = {
  cart: undefined,
  totalCartItems: 0,
  totalPrice: 0,
  isLoading: false,
  isLoadingRemove: false,
  removingCartId: 0,
  error: null,
};

// -------------------------- FUNCTION --------------------------
// Count total items in Cart
// export const getTotalCart = (cartItems: CartItemData[] | undefined) => {
//   if (cartItems) {
//     const totalItems = cartItems.reduce((total, cartItem) => {
//       return total + cartItem.product.quantity;
//     }, 0);
//     return totalItems;
//   } else {
//     return 0;
//   }
// };

// Get Cart from API
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const token = getToken;
  if (token) {
    const abortController = new AbortController();
    try {
      const response = await axios.get(getCartApi, {
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = (await response.data) as ServerData;
      const cart = result.data as CartItemData[];
      return cart;
    } catch (error: any) {
      if (!abortController.signal.aborted) {
        console.log(error.message);
      }
    }
  }
});

// Fetch Total Cart Items from API
export const fetchTotalCartItems = createAsyncThunk(
  "cart/fetchTotalCartItems",
  async () => {
    const token = getToken;
    if (token) {
      const abortController = new AbortController();
      try {
        const response = await axios.get(getTotalCartItems, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.data;
        return result.data;
      } catch (error: any) {
        if (!abortController.signal.aborted) {
          console.log(error.message);
        }
      }
    }
  }
);
// Fetch Total Cart Price from API
export const fetchTotalCartPrice = createAsyncThunk(
  "cart/fetchTotalCartPrice",
  async () => {
    const token = getToken;
    if (token) {
      const abortController = new AbortController();
      try {
        const response = await axios.get(getTotalCartPrice, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.data;
        return result.data;
      } catch (error: any) {
        if (!abortController.signal.aborted) {
          console.log(error.message);
        }
      }
    }
  }
);

// Post - Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId }: { productId: number }) => {
    const token = getToken;
    if (token) {
      const abortController = new AbortController();
      const abortControllerGet = new AbortController();
      try {
        await axios.post(
          createCartApi,
          {
            cartId: 0,
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
        // Fetch total items in Cart
        const response = await axios.get(getTotalCartItems, {
          signal: abortControllerGet.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.data;
        return result.data;
      } catch (error: any) {
        if (!abortControllerGet.signal.aborted) {
          console.log(error.message);
        }
      }
    }
  }
);

// Delete product item from cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ cartId }: { cartId: number }) => {
    const token = getToken;
    if (token) {
      const abortController = new AbortController();
      try {
        await axios.delete(deleteCartItemApi(cartId), {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Fetch cart data after
        const response = await axios.get(getCartApi, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = (await response.data) as ServerData;
        const cart = result.data as CartItemData[];
        return cart;
      } catch (error: any) {
        if (!abortController.signal.aborted) {
          console.log(error.message);
        }
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
    // ---------- Fetch Cart ----------
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.totalCartItems =
        action.payload && action.payload.length !== 0
          ? action.payload[0].totalItems
          : 0;
      state.totalPrice =
        action.payload && action.payload.length !== 0
          ? action.payload[0].totalPrice
          : 0;
      state.isLoading = false;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    // ---------- Fetch Total Items in Cart ----------
    builder.addCase(fetchTotalCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalCartItems.fulfilled, (state, action) => {
      state.totalCartItems = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTotalCartItems.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    // ---------- Fetch Total Cart Price ----------
    builder.addCase(fetchTotalCartPrice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalCartPrice.fulfilled, (state, action) => {
      state.totalPrice = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTotalCartPrice.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    // ---------- Add to Cart ----------
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.totalCartItems = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    // ---------- Delete Item in Cart ----------
    builder.addCase(removeItemFromCart.pending, (state, action) => {
      state.isLoadingRemove = true;
      state.removingCartId = action.meta.arg.cartId;
    });
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.totalCartItems =
        action.payload && action.payload.length !== 0
          ? action.payload[0].totalItems
          : 0;
      state.totalPrice =
        action.payload && action.payload.length !== 0
          ? action.payload[0].totalPrice
          : 0;
      state.isLoadingRemove = false;
    });
    builder.addCase(removeItemFromCart.rejected, (state, action) => {
      state.error = action.error;
      state.isLoadingRemove = false;
    });
  },
});

export default cart.reducer;
