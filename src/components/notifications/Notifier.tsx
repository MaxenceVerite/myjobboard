import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { removeNotification } from '../../store/slices/notificationSlice';
import { RootState } from '../../store/store';
import Slide, { SlideProps } from '@mui/material/Slide';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }
  
const Notifier = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.notifications);

  const handleClose = (key) => {
    dispatch(removeNotification(key));
  };

  return (
    <div>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.key}
          open={true}
          autoHideDuration={notification.duration ? notification.duration : 5000}
          onClose={() => handleClose(notification.key)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}
        >
          <Alert onClose={() => handleClose(notification.key)} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default Notifier;
