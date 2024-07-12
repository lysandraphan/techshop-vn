import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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

const categoriesApi =
  "https://g5-likelion-ecommerce.onrender.com/api/categories/public/all";

// -------------------------- FUNCTION --------------------------
// Get Category Route
export const getCategoryRoute = (categoryName: string) => {
  return categoryName.toLocaleLowerCase().replace(/ /g, "-");
};

// Get Categories from API
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (thunkAPI) => {
    const response = await fetch(categoriesApi);
    const result = (await response.json()) as CategoryData[];
    return result;
  }
);

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
