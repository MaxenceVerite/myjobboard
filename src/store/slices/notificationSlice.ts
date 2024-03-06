import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '../../ValueObjects/Notification';
import { nanoid } from '@reduxjs/toolkit';

interface NotificationState {
    notifications: Notification[]
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    enqueueNotification(state, action: {payload: Notification}) {
      const notification = action.payload;
      const key = notification.key || nanoid(); 
      const duration = notification.duration || 5000; 

      state.notifications.push({
        ...notification,
        key,
        duration,
      });

    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification.key !== action.payload
      );
    },
  },
});

export const { enqueueNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
