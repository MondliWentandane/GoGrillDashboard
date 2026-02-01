// store/store.ts - COMPLETE CORRECT VERSION
import { configureStore } from '@reduxjs/toolkit';

// IMPORT REDUCERS - Make sure these paths are correct
import authReducer from './slices/authSlice';
import ordersReducer from './slices/ordersSlice';
import mealsReducer from './slices/mealsSlice';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    meals: mealsReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;