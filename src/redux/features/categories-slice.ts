import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// internal
import { RootState } from "../store";
import { categoriesApi } from "@/api";

// -------------------------- INTERFACE --------------------------
export interface CategoriesState {
  categories: CategoryData[];
  isLoading: boolean;
  error: any;
}

export interface CategoryData {
  categoryId: number;
  name: string;
  imagePath: string;
  deletedAt: null;
  quantityProduct: number;
}

// -------------------------- VAR --------------------------
const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

// -------------------------- FUNCTION --------------------------
// Get Categories from API
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(categoriesApi);
    const result = (await response.json()) as CategoryData[];
    return result;
  }
);

// Get Category Route
export const getCategoryRoute = (categoryName: string, categoryId: number) => {
  categoryName = categoryName.toLocaleLowerCase().replace(/ /g, "-");
  return `/categories/${categoryName}?id=${categoryId}`;
};

// -------------------------- REDUX --------------------------
export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default categories.reducer;

// Select Category
export const selectCategory = (state: RootState, categoryId: number) =>
  state.categories.categories.find(
    (category: CategoryData) => category.categoryId === categoryId
  );
