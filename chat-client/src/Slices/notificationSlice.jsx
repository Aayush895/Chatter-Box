import { createSlice } from '@reduxjs/toolkit';

const pendingRequestsnotificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    isNotificationVisible: false,
    incomingRequest: [],
    lastAcceptedRequestData: null,
    lastDeclinedRequestData: null,
  },
  reducers: {
    showNotification: function (state) {
      if (state.isNotificationVisible == false) state.isNotificationVisible = true;
    },
    hideNotification: function (state) {
      if (state.isNotificationVisible == true) state.isNotificationVisible = false;
    },
    getIncomingRequestData: function (state, requestData) {
      state.incomingRequest.push(requestData.payload);
    },
    storeLastAcceptedRequestedData: function (state, acceptedRequestData) {
      state.lastAcceptedRequestData = acceptedRequestData.payload;
    },
    storeLastDeclinedRequestData: function (state, declinedRequestData) {
      state.lastDeclinedRequestData = declinedRequestData;
    },
  },
});

export const {
  showNotification,
  hideNotification,
  getIncomingRequestData,
  storeLastAcceptedRequestedData,
  storeLastDeclinedRequestData,
} = pendingRequestsnotificationSlice.actions;

export default pendingRequestsnotificationSlice.reducer;
