import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// internal
import {
  createCartApi,
  deleteCartItemApi,
  getCartApi,
  getTotalCartItems,
  getTotalCartPrice,
} from "@/api";
import { getToken } from "@/utils/functions";

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
  subTotal: number;
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

// Add item to cart
const addCartItem = (
  cartItems: CartItemData[],
  cartItemToAdd: CartItemData
): CartItemData[] => {
  console.log("Adding cart item")

  // Check if product to add already in cart items
  const existingCartItem = cartItems.find(
    (cartItem: CartItemData) =>
      cartItem.product.productId === cartItemToAdd.product.productId
  );
  // If yes, increment the quantity & calculate new subTotal
  if (existingCartItem) {
    console.log("Existing product")
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
  }
  // if no item in cart
  // return [
  //   ...cartItems,
  //   { ...cartItemToAdd, product: { ...cartItemToAdd.product, quantity: 1 } },
  // ];
  return cartItems;
};

// const addCartItem = (
//   cartItems: CartItemData[],
//   productToAdd: CartProductData
// ): CartItemData[] => {
//   // Check if product to add already in cart items
//   const existingCartItem = cartItems.find(
//     (cartItem: CartItemData) =>
//       cartItem.product.productId === productToAdd.productId
//   );
//   // If yes, increment the quantity
//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.product.productId === productToAdd.productId
//         ? {
//             ...cartItem,
//             product: {
//               ...cartItem.product,
//               quantity: cartItem.product.quantity + 1,
//             },
//           }
//         : cartItem
//     );
//   }
//   // if no item in cart
//   // must return --> cart: CartItemData[]
//   return [...cartItems, {...cartItem, } ];
//   // return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// Remove item from cart
// const removeCartItem = (
//   cartItems: CartItemData[],
//   cartItemToRemove: CartItemData
// ): CartItemData[] => {
//   // find cart item to remove in cart items
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToRemove.id
//   );
//   // Remove the item from card if its quantity is equal to 1
//   if (existingCartItem && existingCartItem.quantity === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
//   }
//   return cartItems.map((cartItem) =>
//     cartItem.id === cartItemToRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// };

// export const addItem = (
//   cartItems: CartItemData[],
//   productToAdd: CartItemData
// ) => {
//   const newCartItems = addCartItem(cartItems, productToAdd);
//   return setCartItems(newCartItems);
// };

// export const removeItem = (
//   cartItems: CartItemData[],
//   cartItemToRemove: CartItemData
// ) => {
//   const newCartItems = removeCartItem(cartItems, cartItemToRemove);
//   return setCartItems(newCartItems);
// };

// -------------------------- THUNK --------------------------
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
  reducers: {
    setCartAdd: (state, action: PayloadAction<CartItemData>) => {
      if (state.cart) {
        state.cart = addCartItem(state.cart, action.payload);
      }
    },
  },
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

export const { setCartAdd } = cart.actions;

export default cart.reducer;