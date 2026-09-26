import { createSlice } from '@reduxjs/toolkit';

const pendingRequestsnotificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    isNotificationVisible: false,
    incomingRequest: null,
  },
  reducers: {
    showNotification: function (state) {
      if (state.isNotificationVisible == false) state.isNotificationVisible = true;
    },
    hideNotification: function (state) {
      if (state.isNotificationVisible == true) state.isNotificationVisible = false;
    },
    getIncomingRequestData: function (state, requestData) {
      if (!state.incomingRequest) {
        state.incomingRequest = requestData;
      }
    },
  },
});

export const { showNotification, hideNotification, getIncomingRequestData } =
  pendingRequestsnotificationSlice.actions;

export default pendingRequestsnotificationSlice.reducer;
