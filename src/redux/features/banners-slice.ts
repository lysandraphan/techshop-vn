import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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

const bannersUrl =
  "https://g5-likelion-ecommerce.onrender.com/banner-images/public/all";

// -------------------------- FUNCTION --------------------------
// Get Banners from API
export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async (thunkAPI) => {
    const response = await fetch(bannersUrl);
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
    });
    builder.addCase(fetchBanners.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default banners.reducer;
