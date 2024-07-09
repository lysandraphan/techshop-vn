import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// -------------------------- INTERFACE --------------------------
interface CategoriesState {
  categories: CategoryData[];
  isLoading: boolean;
  error: any;
}

interface CategoryData {
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

const categoriesUrl =
  "https://g5-likelion-ecommerce.onrender.com/categories/public/all";

// -------------------------- FUNCTION --------------------------
// Get Category Route
export const getCategoryRoute = (categoryName: string) => {
  return categoryName.toLocaleLowerCase().replace(/ /g, "-");
};

// Get Categories from API
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (thunkAPI) => {
    const response = await fetch(categoriesUrl);
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
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

// export const { fetchCategoriesStart, fetchCategoriesFailed } =
//   categories.actions;
export default categories.reducer;
