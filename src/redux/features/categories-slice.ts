import { CategoryData } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: CategoryData;
};

const initialState = {
  value: {
    categoryId: 0,
    name: "",
    imagePath: "",
    deletedAt: null,
    quantityProduct: 0,
  } as CategoryData,
} as InitialState;

export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategoriesStart: (state, action: PayloadAction) => {},
    fetchCategoriesSuccess: () => {},
    fetchCategoriesFailed: () => {},
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} = categories.actions;
export default categories.reducer;
