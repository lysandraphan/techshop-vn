import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// -------------------------- INTERFACE --------------------------
interface FilterState {
  filterCategory: [number, string];
  filterPriceRange: [number, number];
  selectedBrandIds: number[];
  isDisableFilter: boolean;
  totalFilteredProducts: number;
}

// -------------------------- VAR --------------------------
export const maxProductPrice = 100000;

const initialState: FilterState = {
  filterCategory: [0, ""],
  filterPriceRange: [0, maxProductPrice],
  selectedBrandIds: [],
  isDisableFilter: false,
  totalFilteredProducts: 0,
};

// -------------------------- REDUX --------------------------
export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterCategory: (state, action: PayloadAction<[number, string]>) => {
      state.filterCategory = action.payload;
    },
    setFilterPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filterPriceRange = action.payload;
    },

    addSelectedBrandIds: (state, action: PayloadAction<number>) => {
      state.selectedBrandIds.push(action.payload);
    },
    filterSelectedBrandIds: (state, action: PayloadAction<number>) => {
      state.selectedBrandIds = state.selectedBrandIds.filter(
        (brandId) => brandId !== action.payload
      );
    },
    resetFilterPriceRange: (state) => {
      state.filterPriceRange = [0, maxProductPrice];
    },
    resetSelectedBrandIds: (state) => {
      state.selectedBrandIds = [];
    },
    resetAllFilters: (state) => {
      state.filterPriceRange = [0, maxProductPrice];
      state.selectedBrandIds = [];
    },
    setDisableFilter: (state, action: PayloadAction<boolean>) => {
      state.isDisableFilter = action.payload;
    },
    setTotalFilteredProducts: (state, action: PayloadAction<number>) => {
      state.totalFilteredProducts = action.payload;
    },
  },
});

export const {
  setFilterCategory,
  setFilterPriceRange,
  addSelectedBrandIds,
  filterSelectedBrandIds,
  resetFilterPriceRange,
  resetSelectedBrandIds,
  resetAllFilters,
  setDisableFilter,
  setTotalFilteredProducts,
} = filter.actions;

export default filter.reducer;
