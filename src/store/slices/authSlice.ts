
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import Token from '../../models/authentication/Token';


export interface AuthState {
  isConnected: boolean;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isConnected: false,
  token: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

interface LoginPayload {
  mail: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {

      const data = await authService.login(credentials);
      return data;

    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface RegisterPayload{
  mail: string;
  tel: string;
  password: string;
}

export const register = createAsyncThunk(
  'auth/register',
  async (registerPayload: RegisterPayload, { rejectWithValue }) => {
    try {

      const data = await authService.register({...registerPayload});
      return data;

    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Action pour rafraîchir le token
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken(refreshToken);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    logout(state) {
      state.isConnected = false;
      state.token = null;
      state.isLoading = false;
      state.error = null;

    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<Token>) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.isConnected = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isConnected = false;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<void>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(refreshAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action: PayloadAction<Token>) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoading = false;
      })
      .addCase(refreshAccessToken.rejected, (state, action:any) => {
        state.error = action.payload;
        state.refreshToken = null;
        state.token = null;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
