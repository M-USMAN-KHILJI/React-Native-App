import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    resetEmail: '',
  },
  reducers: {
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
    clearResetEmail: (state) => {
      state.resetEmail = '';
    },
  },
});

export const { setResetEmail, clearResetEmail } = authSlice.actions;
export default authSlice.reducer;
