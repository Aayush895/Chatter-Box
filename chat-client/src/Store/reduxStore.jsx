import { configureStore } from '@reduxjs/toolkit';
import pendingRequestnotificationReducer from '../Slices/notificationSlice.jsx';
import { socketMiddleware } from '../Middlewares/socketMiddleware.js';
import { SOCKET_ENDPOINT } from '../Config/clientConfigs.js';

const reduxStore = configureStore({
  reducer: {
    pendingRequestsNotification: pendingRequestnotificationReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(socketMiddleware(SOCKET_ENDPOINT));
  },
});

export default reduxStore;
