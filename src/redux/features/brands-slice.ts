import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import lodash from "lodash";

// internal
import { brandsApi } from "@/api";

// -------------------------- INTERFACE --------------------------
export interface BrandsState {
  brands: BrandData[];
  selectedBrandIds: number[];
  isLoading: boolean;
  error: any;
}

interface ServerBrandsData {
  message: string;
  data: BrandData[];
}

export interface BrandData {
  id: number;
  name: string;
}

// -------------------------- VAR --------------------------
const initialState: BrandsState = {
  brands: [],
  selectedBrandIds: [],
  isLoading: false,
  error: null,
};

// -------------------------- FUNCTION --------------------------
// Get Brands from API
export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const response = await fetch(brandsApi);
  const result = (await response.json()) as ServerBrandsData;
  const data = lodash.sortBy(result.data, ["name"]);
  return data;
});

// -------------------------- REDUX --------------------------
export const brands = createSlice({
  name: "brands",
  initialState,
  reducers: {
    addSelectedBrandIds: (state, action: PayloadAction<number>) => {
      state.selectedBrandIds.push(action.payload);
    },
    filterSelectedBrandIds: (state, action: PayloadAction<number>) => {
      state.selectedBrandIds = state.selectedBrandIds.filter(
        (brandId) => brandId !== action.payload
      );
    },
    resetSelectedBrandIds: (state) => {
      state.selectedBrandIds = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBrands.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export const {
  addSelectedBrandIds,
  filterSelectedBrandIds,
  resetSelectedBrandIds,
} = brands.actions;

export default brands.reducer;