import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// -------------------------- INTERFACE --------------------------
interface FilterState {
  filterCategory: [number, string];
  filterPriceRange: [number, number];
  isDisableFilter: boolean;
  totalFilteredProducts: number;
  sortValue: SortType;
}

export type SortType = "default" | "lowest" | "highest";

// -------------------------- VAR --------------------------
export const maxProductPrice = 100000;

const initialState: FilterState = {
  filterCategory: [0, ""],
  filterPriceRange: [0, maxProductPrice],
  isDisableFilter: false,
  totalFilteredProducts: 0,
  sortValue: "default",
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
    setDisableFilter: (state, action: PayloadAction<boolean>) => {
      state.isDisableFilter = action.payload;
    },
    setTotalFilteredProducts: (state, action: PayloadAction<number>) => {
      state.totalFilteredProducts = action.payload;
    },
    setSortValue: (state, action: PayloadAction<SortType>) => {
      state.sortValue = action.payload;
    },
  },
});

export const {
  setFilterCategory,
  setFilterPriceRange,
  setDisableFilter,
  setTotalFilteredProducts,
  setSortValue,
} = filter.actions;

export default filter.reducer;
