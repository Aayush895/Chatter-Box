import { configureStore } from '@reduxjs/toolkit';
import pendingRequestnotificationReducer from '../Slices/notificationSlice.jsx';
import clientSocketReducer from '../Slices/socketSlice.jsx';

const reduxStore = configureStore({
  reducer: {
    pendingRequestsNotification: pendingRequestnotificationReducer,
    clientSocket: clientSocketReducer,
  },
});

export default reduxStore;
