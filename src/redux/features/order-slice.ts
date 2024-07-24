import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// internal
import { getOrderApi, signInApi, signOutApi } from "@/api";
import { getToken } from "@/utils/functions";

// -------------------------- INTERFACE --------------------------
export interface OrdersState {
  orders: OrderData[] | undefined;
  isLoading: boolean;
  error: any;
}

export interface OrderData {
  orderId: number;
  usertId: number;
  country: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  totalPrice: number;
  currency: string;
  orderTime: string;
  paymentType: string;
  addressLine1: string;
  addressLine2: string;
  apartment: string;
  suburb: string;
  city: string;
  region: string;
  status: number;
  description: string;
  couponId: number;
  orderDetailResponses: [
    {
      productId: number;
      quantity: number;
      price: number;
    }
  ];
}

// -------------------------- VAR --------------------------
const initialState: OrdersState = {
  orders: undefined,
  isLoading: false,
  error: null,
};

const ORDER_STATUS = {
  1: "Order Placed",
  2: "In Progress",
  3: "Completed",
  4: "Cancelled",
};

const abortController = new AbortController();

// -------------------------- FUNCTION --------------------------
//Fetch All Orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ accountId }: { accountId: number }) => {
    try {
      const response = await axios.get(getOrderApi(accountId), {
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      const result = response.data as OrderData[];
      console.log(result);
      return result;
    } catch (error: any) {
      if (!abortController.signal.aborted) {
        console.log(error.message);
      }
    }
  }
);

//Fetch Order Detail by Order Id
export const fetchOrderDetail = createAsyncThunk(
  "orders/fetchOrderDetail",
  async ({ accountId }: { accountId: number }) => {
    try {
      const response = await axios.get(getOrderApi(accountId), {
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      const result = response.data as OrderData;
      console.log(result);
      return result;
    } catch (error: any) {
      if (!abortController.signal.aborted) {
        console.log(error.message);
      }
    }
  }
);

// -------------------------- REDUX --------------------------
export const order = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default order.reducer;
