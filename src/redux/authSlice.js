import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    resetEmail: '',
    user: {
      name: null,
      email: null,
      photoURL: null,
      uid: null,
    },
  },
  reducers: {
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
    clearResetEmail: (state) => {
      state.resetEmail = '';
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = { name: null, email: null, photoURL: null, uid: null };
    },
  },
});

export const { setResetEmail, clearResetEmail, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;