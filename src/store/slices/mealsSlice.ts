// store/slices/mealsSlice.ts - COMPLETE FIXED VERSION (remove unused setSelectedCategory)
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type UIMeal } from '../../types/restaurant.types';
import ApiService from '../../services/appwriteService';

interface MealsState {
  meals: UIMeal[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MealsState = {
  meals: [],
  isLoading: false,
  error: null,
};

// Helper to convert AppWrite meal to UIMeal
const mapToUIMeal = (doc: any): UIMeal => {
  return {
    id: doc.$id,
    name: doc.name,
    description: doc.description || '',
    price: doc.price || 0,
    categoryId: doc.categoryId,
    categoryName: doc.categoryName || '',
    image: doc.image || '',
    preparationTime: doc.preparationTime || 15,
    ingredients: doc.ingredients || [],
    calories: doc.calories,
    spiceLevel: doc.spiceLevel,
    isAvailable: doc.isAvailable ?? true,
    isPopular: doc.isPopular ?? false,
    isDiscounted: doc.isDiscounted ?? false,
    discountPercentage: doc.discountPercentage,
    sku: doc.sku,
    sortOrder: doc.sortOrder || 0,
    notes: doc.notes,
    createdBy: doc.createdBy || 'admin',
  };
};

// Interface for fetchMeals parameters
interface FetchMealsParams {
  categoryId?: string;
}

export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async (params: FetchMealsParams = {}, { rejectWithValue }) => {
    try {
      const { categoryId } = params;
      const response = await ApiService.getMeals(categoryId);
      const uiMeals = response.documents.map(mapToUIMeal);
      return uiMeals;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMeal = createAsyncThunk(
  'meals/createMeal',
  async (mealData: any, { rejectWithValue }) => {
    try {
      const response = await ApiService.createMeal(mealData);
      return mapToUIMeal(response);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMeal = createAsyncThunk(
  'meals/updateMeal',
  async ({ mealId, mealData }: { mealId: string; mealData: any }, { rejectWithValue }) => {
    try {
      const response = await ApiService.updateMeal(mealId, mealData);
      return mapToUIMeal(response);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMeal = createAsyncThunk(
  'meals/deleteMeal',
  async (mealId: string, { rejectWithValue }) => {
    try {
      await ApiService.deleteMeal(mealId);
      return mealId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    // Remove unused setSelectedCategory and only keep clearError
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Meals
      .addCase(fetchMeals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action: PayloadAction<UIMeal[]>) => {
        state.isLoading = false;
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Create Meal
      .addCase(createMeal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMeal.fulfilled, (state, action: PayloadAction<UIMeal>) => {
        state.isLoading = false;
        state.meals.unshift(action.payload);
      })
      .addCase(createMeal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Update Meal
      .addCase(updateMeal.fulfilled, (state, action: PayloadAction<UIMeal>) => {
        const index = state.meals.findIndex(meal => meal.id === action.payload.id);
        if (index !== -1) {
          state.meals[index] = action.payload;
        }
      })
      
      // Delete Meal
      .addCase(deleteMeal.fulfilled, (state, action: PayloadAction<string>) => {
        state.meals = state.meals.filter(meal => meal.id !== action.payload);
      });
  },
});

// Export only clearError since setSelectedCategory was unused
export const { clearError } = mealsSlice.actions;
export default mealsSlice.reducer;