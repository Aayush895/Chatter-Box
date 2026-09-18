import { createSlice } from '@reduxjs/toolkit';

const pendingRequestsnotificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    isNotificationVisible: false,
  },
  reducers: {
    showNotification: function (state) {
      if (state.isNotificationVisible == false) state.isNotificationVisible = true;
    },
    hideNotification: function (state) {
      if (state.isNotificationVisible == true) state.isNotificationVisible = false;
    },
  },
});

export const { showNotification, hideNotification } =
  pendingRequestsnotificationSlice.actions;

export default pendingRequestsnotificationSlice.reducer;
