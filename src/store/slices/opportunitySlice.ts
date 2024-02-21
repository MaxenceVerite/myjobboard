
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Opportunity, { EOpportunityState } from '../../models/opportunities/Opportunity';
import * as opportunityService from '../../services/opportunityService';


interface OpportunityState {
    opportunityPhases: EOpportunityState[],
    currentOpportunity?: Opportunity,
    opportunities: Opportunity[],
    isLoading: boolean,
    error?: string 
}

const initialState: OpportunityState = {
    opportunityPhases: [],
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


  interface CreateOpportunityPayload{
    opportunity: Opportunity
  }

  export const createOpportunity = createAsyncThunk(
    'opportunity/createOpportunity',
    async (payload: CreateOpportunityPayload, { rejectWithValue }) => {
      try {
        var result = await opportunityService.createOpportunity(payload.opportunity);

        return result;
      } catch (error) {
        return rejectWithValue('Erreur lors de la création de l\'opportunité');
      }
    }
  );


const opportunitySlice = createSlice({
  name: 'opportunities',
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
    .addCase(
      createOpportunity.fulfilled,
      (state, action: PayloadAction<Opportunity>) =>  {
        state.isLoading = false;
        state.opportunities.push(action.payload)
      }
    )
    .addCase(
      createOpportunity.pending,
      (state) =>  {
        state.isLoading = true;
      }
    )
    .addCase(
      createOpportunity.rejected,
      (state, action: PayloadAction<any>) =>  {
        state.isLoading = false;
        state.error = action.payload
      }
    )
  },
});

export const { } = opportunitySlice.actions;
export default opportunitySlice.reducer;
