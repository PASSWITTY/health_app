import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emergencyContacts: [],
  isLoading: false,
  error: null,
};

const emergencyContactSlice = createSlice({
  name: 'emergencyContact',
  initialState,
  reducers: {
    fetchEmergencyContactsStart: (state) => {
      state.isLoading = true;
    },
    fetchEmergencyContactsSuccess: (state, action) => {
      state.isLoading = false;
      state.emergencyContacts = action.payload;
      state.error = null;
    },
    fetchEmergencyContactsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addEmergencyContact: (state, action) => {
      state.emergencyContacts.push(action.payload);
    },
    updateEmergencyContact: (state, action) => {
      const index = state.emergencyContacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.emergencyContacts[index] = action.payload;
      }
    },
    deleteEmergencyContact: (state, action) => {
      state.emergencyContacts = state.emergencyContacts.filter(contact => contact.id !== action.payload);
    },
  },
});

export const {
  fetchEmergencyContactsStart,
  fetchEmergencyContactsSuccess,
  fetchEmergencyContactsFailure,
  addEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
} = emergencyContactSlice.actions;

export default emergencyContactSlice.reducer;
