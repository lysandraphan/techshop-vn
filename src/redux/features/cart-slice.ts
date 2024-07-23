import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// internal
import {
  createCartApi,
  deleteCartItemApi,
  findCouponApi,
  getCartApi,
  getTotalCartItems,
  getTotalCartPrice,
  updateCartApi,
  updateCouponApi,
} from "@/api";
import { getToken } from "@/utils/functions";

// -------------------------- INTERFACE --------------------------
export interface CartState {
  cart: CartItemData[] | null | undefined;
  totalCartItems: number;
  totalPrice: number;
  discountPrice: number;
  totalFinalPrice: number;
  isLoading: boolean;
  isLoadingRemove: boolean;
  isLoadingUpdate: boolean;
  isLoadingCoupon: boolean;
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
  subTotal: number;
  categoryDto: {
    categoryId: number;
    name: string;
    imagePath: string;
    deleteAt: string | null;
    quantityProduct: number | null;
  };
}

export interface CouponData {
  couponId: number;
  code: string;
  value: number;
  quantity: number;
  quantityUsed: number;
  createdAt: string;
}

// -------------------------- VAR --------------------------
const initialState: CartState = {
  cart: undefined,
  totalCartItems: 0,
  totalPrice: 0,
  discountPrice: 0,
  totalFinalPrice: 0,
  isLoading: false,
  isLoadingRemove: false,
  isLoadingUpdate: false,
  isLoadingCoupon: false,
  removingCartId: 0,
  error: null,
};

// -------------------------- FUNCTION --------------------------
// Update cart item's quantity & calculate its new subTotal
const updateCartItem = (
  cartItems: CartItemData[],
  cartItemToAdd: CartItemData,
  actionType: "increment" | "decrement"
): CartItemData[] => {
  // Check if product to add already in cart items
  const existingCartItem = cartItems.find(
    (cartItem: CartItemData) =>
      cartItem.product.productId === cartItemToAdd.product.productId
  );
  // If yes, update the quantity & calculate new subTotal
  if (existingCartItem) {
    if (actionType === "increment") {
      return cartItems.map((cartItem) =>
        cartItem.product.productId === cartItemToAdd.product.productId
          ? {
              ...cartItem,
              product: {
                ...cartItem.product,
                quantity: cartItem.product.quantity + 1,
                subTotal:
                  cartItem.product.price * (cartItem.product.quantity + 1),
              },
            }
          : cartItem
      );
    } else {
      return cartItems.map((cartItem) =>
        cartItem.product.productId === cartItemToAdd.product.productId
          ? {
              ...cartItem,
              product: {
                ...cartItem.product,
                quantity: cartItem.product.quantity - 1,
                subTotal:
                  cartItem.product.price * (cartItem.product.quantity - 1),
              },
            }
          : cartItem
      );
    }
  }
  // If no item in cart
  return cartItems;
};

// Update totalFinalPrice based on totalPrice(subtotal) & discountPrice
const calcTotalFinalPrice = (subtotal: number, discountPrice: number) => {
  if (discountPrice === 0) {
    return subtotal;
  } else {
    const total = subtotal - discountPrice;
    return total;
  }
};

// Calculate discount price based on coupon value
const calcDiscountPrice = (subtotal: number, couponValue: number) => {
  if (couponValue === 0) return 0;
  const discountPrice = (subtotal / 100) * couponValue;
  return discountPrice;
};

// -------------------------- THUNK --------------------------
// Fetch Cart from API
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
        // Fetch updated cart data
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

// Put - Update Cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ cartItems }: { cartItems: CartItemData[] }) => {
    const token = getToken;
    if (token) {
      const abortController = new AbortController();
      const abortControllerGet = new AbortController();
      try {
        await axios.put(updateCartApi, [...cartItems], {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Fetch updated cart data
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
        if (!abortControllerGet.signal.aborted) {
          console.log(error.message);
        }
      }
    }
  }
);

// Fetch Coupon Code & Update Coupon
export const fetchCoupon = createAsyncThunk(
  "cart/fetchCoupon",
  async ({ couponCode }: { couponCode: string }) => {
    const token = getToken;
    if (token) {
      const abortController = new AbortController();
      try {
        const response = await axios.get(findCouponApi(couponCode), {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const coupon = (await response.data) as CouponData;
        // Check if coupon is available or not
        if (coupon.quantity - coupon.quantityUsed <= 0) return 0;
        // Update coupon quantity being used
        await axios.put(
          updateCouponApi,
          {
            ...coupon,
            quantity: coupon.quantity - 1,
            quantityUsed: coupon.quantityUsed + 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return coupon.value;
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
  reducers: {
    incrementCartItem: (state, action: PayloadAction<CartItemData>) => {
      if (state.cart) {
        state.cart = updateCartItem(state.cart, action.payload, "increment");
      }
    },
    decrementCartItem: (state, action: PayloadAction<CartItemData>) => {
      if (state.cart) {
        state.cart = updateCartItem(state.cart, action.payload, "decrement");
      }
    },
    setDiscountPrice: (state, action: PayloadAction<number>) => {
      state.discountPrice = action.payload;
    },
    setTotalFinalPrice: (state, action: PayloadAction<number>) => {
      state.totalFinalPrice = action.payload;
    },
  },
  extraReducers(builder) {
    // ---------- Fetch Cart ----------
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      if (action.payload) {
        state.totalCartItems = action.payload[0].totalItems;
        state.totalPrice = action.payload[0].totalPrice;
        state.totalFinalPrice = calcTotalFinalPrice(
          state.totalPrice,
          state.discountPrice
        );
      }
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
    // ---------- Post Add to Cart ----------
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
    // ---------- Put Update Cart ----------
    builder.addCase(updateCart.pending, (state) => {
      state.isLoadingUpdate = true;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.totalCartItems = action.payload[0].totalItems;
        state.totalPrice = action.payload[0].totalPrice;
        state.totalFinalPrice = calcTotalFinalPrice(
          state.totalPrice,
          state.discountPrice
        );
      }
      state.isLoadingUpdate = false;
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.error = action.error;
      state.isLoadingUpdate = false;
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
    // ---------- Fetch Coupon ----------
    builder.addCase(fetchCoupon.pending, (state) => {
      state.isLoadingCoupon = true;
    });
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {
      if (action.payload) {
        const newDiscountPrice = calcDiscountPrice(
          state.totalPrice,
          action.payload
        );
        state.discountPrice = newDiscountPrice;
        state.totalFinalPrice = calcTotalFinalPrice(
          state.totalPrice,
          newDiscountPrice
        );
      }
      state.isLoadingCoupon = false;
    });
    builder.addCase(fetchCoupon.rejected, (state, action) => {
      state.error = action.error;
      state.isLoadingCoupon = false;
    });
  },
});

export const {
  incrementCartItem,
  decrementCartItem,
  setTotalFinalPrice,
  setDiscountPrice,
} = cart.actions;

export default cart.reducer;
