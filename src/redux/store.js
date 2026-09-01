import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tournamentReducer from './tournamentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tournament: tournamentReducer,
  },
});

export default store;
