import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { name: null, email: null, photoURL: null, uid: null },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
    clearUser: (state) => {
      state.name = null;
      state.email = null;
      state.photoURL = null;
      state.uid = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;   