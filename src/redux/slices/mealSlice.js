import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meals: [],
  isLoading: false,
  error: null,
};

const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    fetchMealsStart: (state) => {
      state.isLoading = true;
    },
    fetchMealsSuccess: (state, action) => {
      state.isLoading = false;
      state.meals = action.payload;
      state.error = null;
    },
    fetchMealsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addMeal: (state, action) => {
      state.meals.push(action.payload);
    },
    updateMeal: (state, action) => {
      const index = state.meals.findIndex(meal => meal.id === action.payload.id);
      if (index !== -1) {
        state.meals[index] = action.payload;
      }
    },
    deleteMeal: (state, action) => {
      state.meals = state.meals.filter(meal => meal.id !== action.payload);
    },
  },
});

export const {
  fetchMealsStart,
  fetchMealsSuccess,
  fetchMealsFailure,
  addMeal,
  updateMeal,
  deleteMeal,
} = mealSlice.actions;

export default mealSlice.reducer;
