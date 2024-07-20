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
// Sign In & Fetch User Detail
export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axios.post(signInApi, {
        username,
        password,
      });
      console.log("Signed In");
      const accountId = response.data.id;
      const token = response.data.token;
      const responseUser = await axios.get(getUserDetailApi(accountId), {
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = responseUser.data[0] as UserData;
      return result;
    } catch (error: any) {
      console.log(error.message);
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
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default user.reducer;
