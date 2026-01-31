// store/slices/categoriesSlice.ts - NEW FILE
import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import {type UICategory } from '../../types/restaurant.types';
import ApiService from '../../services/appwriteService';

interface CategoriesState {
  categories: UICategory[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

// Helper to convert AppWrite category to UICategory
const mapToUICategory = (doc: any): UICategory => ({
  id: doc.$id,
  name: doc.name,
  description: doc.description || '',
  icon: doc.icon || '',
  color: doc.color || '#ff9a03',
  sortOrder: doc.sortOrder || 0,
  mealCount: doc.mealCount || 0,
  isActive: doc.isActive ?? true,
});

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiService.getCategories();
      const uiCategories = response.documents.map(mapToUICategory);
      return uiCategories;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<UICategory[]>) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;