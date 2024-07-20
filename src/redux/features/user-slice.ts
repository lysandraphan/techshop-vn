import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// internal
import { brandsApi, getUserDetailApi, signInApi } from "@/api";

// -------------------------- INTERFACE --------------------------
export interface UserState {
  user: UserData | undefined;
  isLoading: boolean;
  error: any;
}

export interface UserData {
  type: 0;
  region: string;
  fullName: string;
  status: 0;
  username: string;
  password: string;
  accountId: 0;
  avatar: string;
  createdAt: string;
  phoneNumber: string;
  email: string;
  birthdate: string;
  addressLine1: string;
  addressLine2: string;
  apartment: string;
  suburb: string;
  city: string;
  userId: 0;
}

// -------------------------- VAR --------------------------
const initialState: UserState = {
  user: undefined,
  isLoading: false,
  error: null,
};

const abortController = new AbortController();

// -------------------------- FUNCTION --------------------------
// Sign In
export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axios.post(signInApi, {
        username,
        password,
      });
      return { accountId: response.data.id, token: response.data.token };
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// Get User from API
export const fetchUserDetail = createAsyncThunk(
  "user/fetchUserDetail",
  async ({ accountId, token }: { accountId: number; token: number }) => {
    try {
      //   console.log(accountId);
      const response = await fetch(getUserDetailApi(accountId), {
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = (await response.json()) as UserData;
      console.log("User");
      console.log(result);
      return result;
    } catch (error: any) {
      if (!abortController.signal.aborted) {
        console.log(error.message);
      } else {
        console.log("Fetch request aborted.");
      }
    }
  }
);

// -------------------------- REDUX --------------------------
export const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      //   state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(fetchUserDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserDetail.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserDetail.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default user.reducer;
