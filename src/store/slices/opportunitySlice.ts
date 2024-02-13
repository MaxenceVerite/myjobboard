
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Opportunity from '../../models/opportunities/Opportunity';
import * as opportunityService from '../../services/opportunityService';

interface OpportunityState {
    currentOpportunity?: Opportunity,
    opportunities: Opportunity[],
    isLoading: boolean,
    error?: string 
}

const initialState: OpportunityState = {
    opportunities: [],
    isLoading: false
}

export const getOpportunities = createAsyncThunk(
    'opportunity/getOpportunities',
    async (_, { rejectWithValue }) => {
      try {
        const opportunities = await opportunityService.getOpportunities();
        return opportunities;
      } catch (error) {
        return rejectWithValue('Erreur lors de la récupération des opportunités de l\'utilisateur');
      }
    }
  );


  interface GetOpportunityPayload{
    id: string
  }

  export const getOpportunity = createAsyncThunk(
    'opportunity/getOpportunity',
    async (payload: GetOpportunityPayload, { rejectWithValue }) => {
      try {
        const opportunity = await opportunityService.getOpportunity(payload.id);
        return opportunity;
      } catch (error) {
        return rejectWithValue('Erreur lors de la récupération de l\'opportunité de l\'utilisateur');
      }
    }
  );

  interface DeleteOpportunityPayload{
    opportunity: Opportunity
  }


  export const deleteOpportunity = createAsyncThunk(
    'opportunity/deleteOpportunity',
    async (payload: DeleteOpportunityPayload, { rejectWithValue }) => {
      try {
        await opportunityService.deleteOpportunity(payload.opportunity);
      } catch (error) {
        return rejectWithValue('Erreur lors de la suppression de l\'opportunité');
      }
    }
  );

const opportunitySlice = createSlice({
  name: 'opportunity',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(
        getOpportunities.fulfilled, 
        (state, action: PayloadAction<Opportunity[]>) => {
            state.opportunities = action.payload;
            state.isLoading = false;
        }
    )
    .addCase(
        getOpportunities.pending, 
        (state) => {
            state.isLoading = true;
        }
    )
    .addCase(
        getOpportunities.rejected,
        (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    )
    .addCase(
        getOpportunity.fulfilled, 
        (state, action: PayloadAction<Opportunity>) => {
            state.currentOpportunity = action.payload;
            state.isLoading = false;
        }
    )
    .addCase(
        getOpportunity.pending, 
        (state) => {
            state.isLoading = true;
        }
    )
    .addCase(
        getOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    )
    .addCase(
        deleteOpportunity.fulfilled, 
        (state) => {
            state.isLoading = false;
        }
    )
    .addCase(
        deleteOpportunity.pending, 
        (state) => {
            state.isLoading = true;
        }
    )
    .addCase(
        deleteOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    )
  },
});

export const { } = opportunitySlice.actions;
export default opportunitySlice.reducer;
