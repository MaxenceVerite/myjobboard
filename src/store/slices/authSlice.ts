
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import User from '../../models/user';
import Token from '../../models/authentication/Token';


export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
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


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    logout(state) {
      state.user = null;
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
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
