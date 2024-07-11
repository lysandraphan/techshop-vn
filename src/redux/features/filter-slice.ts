import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// -------------------------- INTERFACE --------------------------
interface FilterState {
  filterCategory: [number, string];
  filterPriceRange: [number, number];
  isDisableFilter: boolean;
}

// -------------------------- VAR --------------------------
export const maxProductPrice = 100000;

const initialState: FilterState = {
  filterCategory: [0, ""],
  filterPriceRange: [0, maxProductPrice],
  isDisableFilter: false,
};

// -------------------------- REDUX --------------------------
export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterCategory(state, action: PayloadAction<[number, string]>) {
      state.filterCategory = action.payload;
    },
    setFilterPriceRange: (state, action) => {
      state.filterPriceRange = action.payload;
    },
    setDisableFilter: (state, action) => {
      state.isDisableFilter = action.payload;
    },
  },
});

export const { setFilterCategory, setFilterPriceRange, setDisableFilter } =
  filter.actions;

export default filter.reducer;
