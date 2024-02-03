import { store } from '../store/store';
import { refreshAccessToken, logout } from '../store/slices/authSlice';

const attemptTokenRefresh = async () => {
    const state = store.getState();
    const refreshTokenValue = state.auth.refreshToken;

    if (refreshTokenValue) {
        try {
            const newAccessToken = await store.dispatch(refreshAccessToken(refreshTokenValue)).unwrap();
            return newAccessToken;
        } catch (error) {
            store.dispatch(logout());
            throw error;
        }
    } else {
        store.dispatch(logout());
        throw new Error('No refresh token available');
    }
};

export default attemptTokenRefresh;
