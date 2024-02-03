import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import documentReducer from './slices/documentSlice';
import notificationReducer from './slices/notificationSlice';
import { userSessionMiddleware } from './middlewares/userSessionMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documents: documentReducer,
    notifications: notificationReducer
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userSessionMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
