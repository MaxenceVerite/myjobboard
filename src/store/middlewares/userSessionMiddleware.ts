import { isRejectedWithValue } from '@reduxjs/toolkit';
import { logout} from '../slices/authSlice';

export const userSessionMiddleware = (store) => (next) => async (action) => {
    if (isRejectedWithValue(action)) {
        const { payload } = action;

        if (payload?.sessionExpired) {
            await store.dispatch(logout());
        }
    }

    return next(action);
};
