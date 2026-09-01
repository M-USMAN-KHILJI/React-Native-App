import { createSlice } from '@reduxjs/toolkit';

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState: {
    joinedPlayers: [],
  },
  reducers: {
    addJoinedPlayer: (state, action) => {
      state.joinedPlayers.push(action.payload);
    },
    setJoinedPlayers: (state, action) => {
      state.joinedPlayers = action.payload;
    },
    clearJoinedPlayers: state => {
      state.joinedPlayers = [];
    },
  },
});

export const { addJoinedPlayer, setJoinedPlayers, clearJoinedPlayers } =
  tournamentSlice.actions;
export default tournamentSlice.reducer;
