
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import * as interlocutorService from '../../services/interlocutorService';
import Interlocutor from '../../models/opportunities/Interlocutor';


interface InterlocutorState {
    interlocutors: Interlocutor[],
    isLoading: boolean,
    error?: string 
}

const initialState: InterlocutorState = {
    interlocutors: [],
    isLoading: false
}

export const getInterlocutors = createAsyncThunk(
    'interlocutor/getInterlocutors',
    async (_, { rejectWithValue }) => {
      try {
        const companies = await interlocutorService.getInterlocutors();
        return companies;
      } catch (error) {
        return rejectWithValue('Erreur lors de la récupération des interlocuteurs de l\'utilisateur');
      }
    }
  );


interface CreateInterlocutorPayload{
    interlocutor: Interlocutor
}

  export const createInterlocutor = createAsyncThunk(
    'interlocutor/createInterlocutor',
    async (payload: CreateInterlocutorPayload, { rejectWithValue }) => {
      try {
        var result = await interlocutorService.createInterlocutor(payload.interlocutor);

        return result;
      } catch (error) {
        return rejectWithValue('Erreur lors de la création de l\'interlocuteur');
      }
    }
  );


const interlocutorSlice = createSlice({
  name: 'interlocutors',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(
        getInterlocutors.fulfilled, 
        (state, action: PayloadAction<Interlocutor[]>) => {
            state.interlocutors = action.payload;
            state.isLoading = false;
        }
    )
    .addCase(
        getInterlocutors.pending, 
        (state) => {
            state.isLoading = true;
        }
    )
    .addCase(
        getInterlocutors.rejected,
        (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    )
    .addCase(
        createInterlocutor.fulfilled, 
        (state, action: PayloadAction<Interlocutor>) => {
            state.interlocutors.push(action.payload);
            state.isLoading = false;
        }
    )
    .addCase(
        createInterlocutor.pending, 
        (state) => {
            state.isLoading = true;
        }
    )
    .addCase(
        createInterlocutor.rejected,
        (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    )
  },
});

export const { } = interlocutorSlice.actions;
export default interlocutorSlice.reducer;
