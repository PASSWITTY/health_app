import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hydrationLogs: [],
  dailyGoal: 2000, // in milliliters
  isLoading: false,
  error: null,
};

const hydrationSlice = createSlice({
  name: 'hydration',
  initialState,
  reducers: {
    fetchHydrationLogsStart: (state) => {
      state.isLoading = true;
    },
    fetchHydrationLogsSuccess: (state, action) => {
      state.isLoading = false;
      state.hydrationLogs = action.payload;
      state.error = null;
    },
    fetchHydrationLogsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addHydrationLog: (state, action) => {
      state.hydrationLogs.push(action.payload);
    },
    updateDailyGoal: (state, action) => {
      state.dailyGoal = action.payload;
    },
  },
});

export const {
  fetchHydrationLogsStart,
  fetchHydrationLogsSuccess,
  fetchHydrationLogsFailure,
  addHydrationLog,
  updateDailyGoal,
} = hydrationSlice.actions;

export default hydrationSlice.reducer;
