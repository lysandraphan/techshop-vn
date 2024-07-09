import { CategoryData } from "@/interface";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type CategoriesState = {
  categories: CategoryData[];
  isLoading: boolean;
  error: any;
};

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesUrl =
"https://g5-likelion-ecommerce.onrender.com/categories/public/all";

// Get Category Route
export const getCategoryRoute = (categoryName: string) => {
  return categoryName.toLocaleLowerCase().replace(/ /g, "-");
};

// Get Categories from API
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (thunkAPI) => {
    const response = await fetch(categoriesUrl)
    const result = (await response.json()) as CategoryData[];
    return result;

  }
); 

// Categories Slice
export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategoriesStart: () => {},
    fetchCategoriesFailed: () => {},
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesFailed,
} = categories.actions;
export default categories.reducer;
