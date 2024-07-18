import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// -------------------------- INTERFACE --------------------------
interface SortState {
  sortProductOrder: SortProductType;
  sortReviewOrder: SortReviewType;
}

export type SortProductType = "default" | "lowest" | "highest" | "top";

export type SortReviewType = "default" | "lowest" | "highest" | "recent";

// -------------------------- VAR --------------------------
const initialState: SortState = {
  sortProductOrder: "default",
  sortReviewOrder: "default",
};

// -------------------------- REDUX --------------------------
export const sort = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortProductOrder: (state, action: PayloadAction<SortProductType>) => {
      state.sortProductOrder = action.payload;
    },
    setSortReviewOrder: (state, action: PayloadAction<SortReviewType>) => {
      state.sortReviewOrder = action.payload;
    },
  },
});

export const { setSortProductOrder, setSortReviewOrder } = sort.actions;

export default sort.reducer;
