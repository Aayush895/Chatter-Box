import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'sockets',
  initialState: null,
  reducers: {
    initialiseSocket: function (state, incomingSocketPayload) {
      state = incomingSocketPayload;
    },
  },
});

export const { initialiseSocket } = socketSlice.actions;
export default socketSlice.reducer;
