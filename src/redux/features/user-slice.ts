import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// internal
import { getUserDetailApi, signInApi, signOutApi } from "@/api";

// -------------------------- INTERFACE --------------------------
export interface UserState {
  user: UserData | undefined;
  isLoading: boolean;
  error: any;
}

export interface UserData {
  type: number;
  region: string;
  firstName: string;
  lastName: string;
  status: number;
  email: string;
  password: string;
  accountId: number;
  avatar: string;
  createdAt: string;
  phoneNumber: string;
  username: string;
  birthdate: string;
  addressLine1: string;
  addressLine2: string;
  apartment: string;
  suburb: string;
  city: string;
  userId: number;
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
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(signInApi, {
        email,
        password,
      });
      const accountId = response.data.id;
      const token = response.data.token;
      document.cookie = `token=${token}`;
      const responseUser = await axios.get(getUserDetailApi(accountId), {
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = responseUser.data[0] as UserData;
      console.log(result);
      return result;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// Sign out
const signOut = createAsyncThunk("user/signOut", async () => {
  try {
    await axios.post(signOutApi);
  } catch (error: any) {
    console.log(error.message);
  }
});

// -------------------------- REDUX --------------------------
export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUserOut: (state) => {
      signOut();
      state.user = undefined;
    },
  },
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

export const { signUserOut } = user.actions;

export default user.reducer;
