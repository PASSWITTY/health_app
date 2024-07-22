import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import medicationReducer from './slices/medicationSlice.js';
import hydrationReducer from './slices/hydrationSlice';
import mealReducer from './slices/mealSlice';
import healthTestReducer from './slices/healthTestSlice';
import emergencyContactReducer from './slices/emergencyContactSlice';
import fraudEducationReducer from './slices/fraudEducationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    medication: medicationReducer,
    hydration: hydrationReducer,
    meal: mealReducer,
    healthTest: healthTestReducer,
    emergencyContact: emergencyContactReducer,
    fraudEducation: fraudEducationReducer,
  },
});

export default store;