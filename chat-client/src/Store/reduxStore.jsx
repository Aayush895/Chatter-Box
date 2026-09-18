import { configureStore } from '@reduxjs/toolkit';
import pendingRequestnotificationReducer from '../Slices/notificationSlice.jsx';

const reduxStore = configureStore({
  reducer: {
    pendingRequestsNotification: pendingRequestnotificationReducer,
  },
});

export default reduxStore;
