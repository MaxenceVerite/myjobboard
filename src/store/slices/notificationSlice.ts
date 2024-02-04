import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '../../ValueObjects/Notification';

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
    enqueueNotification(state, action) {
      state.notifications.push(action.payload);

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
