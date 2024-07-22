import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fraudTips: [],
  isLoading: false,
  error: null,
};

const fraudEducationSlice = createSlice({
  name: 'fraudEducation',
  initialState,
  reducers: {
    fetchFraudTipsStart: (state) => {
      state.isLoading = true;
    },
    fetchFraudTipsSuccess: (state, action) => {
      state.isLoading = false;
      state.fraudTips = action.payload;
      state.error = null;
    },
    fetchFraudTipsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addFraudTip: (state, action) => {
      state.fraudTips.push(action.payload);
    },
    updateFraudTip: (state, action) => {
      const index = state.fraudTips.findIndex(tip => tip.id === action.payload.id);
      if (index !== -1) {
        state.fraudTips[index] = action.payload;
      }
    },
    deleteFraudTip: (state, action) => {
      state.fraudTips = state.fraudTips.filter(tip => tip.id !== action.payload);
    },
  },
});

export const {
  fetchFraudTipsStart,
  fetchFraudTipsSuccess,
  fetchFraudTipsFailure,
  addFraudTip,
  updateFraudTip,
  deleteFraudTip,
} = fraudEducationSlice.actions;

export default fraudEducationSlice.reducer;