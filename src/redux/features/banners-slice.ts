import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// internal
import { bannersApi } from "@/api";

// -------------------------- INTERFACE --------------------------
export interface BannersState {
  banners: BannerData[];
  isLoading: boolean;
  error: any;
}

export interface BannerData {
  id: number;
  imagePath: string;
  isDeleted: boolean;
  alt: string;
}

// -------------------------- VAR --------------------------
const initialState: BannersState = {
  banners: [],
  isLoading: false,
  error: null,
};

// -------------------------- FUNCTION --------------------------
// Get Banners from API
export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async () => {
    const response = await fetch(bannersApi);
    const result = (await response.json()) as BannerData[];
    return result;
  }
);

// -------------------------- REDUX --------------------------
export const banners = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBanners.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBanners.fulfilled, (state, action) => {
      state.banners = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBanners.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default banners.reducer;
