import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  healthTests: [],
  isLoading: false,
  error: null,
};

const healthTestSlice = createSlice({
  name: 'healthTest',
  initialState,
  reducers: {
    fetchHealthTestsStart: (state) => {
      state.isLoading = true;
    },
    fetchHealthTestsSuccess: (state, action) => {
      state.isLoading = false;
      state.healthTests = action.payload;
      state.error = null;
    },
    fetchHealthTestsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addHealthTest: (state, action) => {
      state.healthTests.push(action.payload);
    },
    updateHealthTest: (state, action) => {
      const index = state.healthTests.findIndex(test => test.id === action.payload.id);
      if (index !== -1) {
        state.healthTests[index] = action.payload;
      }
    },
    deleteHealthTest: (state, action) => {
      state.healthTests = state.healthTests.filter(test => test.id !== action.payload);
    },
  },
});

export const {
  fetchHealthTestsStart,
  fetchHealthTestsSuccess,
  fetchHealthTestsFailure,
  addHealthTest,
  updateHealthTest,
  deleteHealthTest,
} = healthTestSlice.actions;

export default healthTestSlice.reducer;
