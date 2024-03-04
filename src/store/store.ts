import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import documentReducer from './slices/documentSlice';
import notificationReducer from './slices/notificationSlice';
import { userSessionMiddleware } from './middlewares/userSessionMiddleware';
import companyReducer from "./slices/companySlice";
import opportunityReducer from './slices/opportunitySlice';
import interlocutorReducer from './slices/interlocutorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documents: documentReducer,
    notifications: notificationReducer,
    companies: companyReducer,
    opportunities: opportunityReducer,
    interlocutors: interlocutorReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userSessionMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
