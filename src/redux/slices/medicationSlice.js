import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  medications: [],
  isLoading: false,
  error: null,
};

const medicationSlice = createSlice({
  name: 'medication',
  initialState,
  reducers: {
    fetchMedicationsStart: (state) => {
      state.isLoading = true;
    },
    fetchMedicationsSuccess: (state, action) => {
      state.isLoading = false;
      state.medications = action.payload;
      state.error = null;
    },
    fetchMedicationsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addMedication: (state, action) => {
      state.medications.push(action.payload);
    },
    updateMedication: (state, action) => {
      const index = state.medications.findIndex(med => med.id === action.payload.id);
      if (index !== -1) {
        state.medications[index] = action.payload;
      }
    },
    deleteMedication: (state, action) => {
      state.medications = state.medications.filter(med => med.id !== action.payload);
    },
  },
});

export const {
  fetchMedicationsStart,
  fetchMedicationsSuccess,
  fetchMedicationsFailure,
  addMedication,
  updateMedication,
  deleteMedication,
} = medicationSlice.actions;

export default medicationSlice.reducer;