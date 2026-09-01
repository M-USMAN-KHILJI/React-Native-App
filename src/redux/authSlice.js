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
    credentials: {
      username: null,
      email: null,
      password: null,
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
    setCredentials: (state, action) => {
      state.credentials = action.payload;
    },
    clearCredentials: (state) => {
      state.credentials = { username: null, email: null, password: null };
    },
  },
});

export const { setResetEmail, clearResetEmail, setUser, clearUser, setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;