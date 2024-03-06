import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Opportunity, {
  EOpportunityState,
  Interview,
} from "../../models/opportunities/Opportunity";
import * as opportunityService from "../../services/opportunityService";

interface OpportunityState {
  opportunityStates: EOpportunityState[];
  currentOpportunity?: Opportunity;
  opportunities: Opportunity[];
  isLoading: boolean;
  error?: string;
}

const initialState: OpportunityState = {
  opportunityStates: Object.values(EOpportunityState),
  opportunities: [],
  isLoading: false,
};

export const getOpportunities = createAsyncThunk(
  "opportunity/getOpportunities",
  async (_, { rejectWithValue }) => {
    try {
      const opportunities = await opportunityService.getOpportunities();
      return opportunities;
    } catch (error) {
      return rejectWithValue(
        "Erreur lors de la récupération des opportunités de l'utilisateur"
      );
    }
  }
);

interface GetOpportunityPayload {
  id: string;
}

export const getOpportunity = createAsyncThunk(
  "opportunity/getOpportunity",
  async (payload: GetOpportunityPayload, { rejectWithValue }) => {
    try {
      const opportunity = await opportunityService.getOpportunity(payload.id);
      return opportunity;
    } catch (error) {
      return rejectWithValue(
        "Erreur lors de la récupération de l'opportunité de l'utilisateur"
      );
    }
  }
);

interface DeleteOpportunityPayload {
  opportunity: Opportunity;
}

export const deleteOpportunity = createAsyncThunk(
  "opportunity/deleteOpportunity",
  async (payload: DeleteOpportunityPayload, { rejectWithValue }) => {
    try {
      await opportunityService.deleteOpportunity(payload.opportunity);
    } catch (error) {
      return rejectWithValue("Erreur lors de la suppression de l'opportunité");
    }
  }
);

interface CreateOpportunityPayload {
  opportunity: Opportunity;
}

export const createOpportunity = createAsyncThunk(
  "opportunity/createOpportunity",
  async (payload: CreateOpportunityPayload, { rejectWithValue }) => {
    try {
      var result = await opportunityService.createOpportunity(
        payload.opportunity
      );

      return result;
    } catch (error) {
      return rejectWithValue("Erreur lors de la création de l'opportunité");
    }
  }
);

interface UpdateOpportunityPayload {
  opportunity: Opportunity;
}
export const updateOpportunity = createAsyncThunk(
  "opportunity/updateOpportunity",
  async (payload: UpdateOpportunityPayload, { rejectWithValue }) => {
    try {
      var result = await opportunityService.updateOpportunity(
        payload.opportunity
      );

      return result;
    } catch (error) {
      return rejectWithValue("Erreur lors de la mise à jour de l'opportunité");
    }
  }
);

interface CreateInterviewPayload {
  opportunityId: string;
  interview: Interview;
}

export const createInterview = createAsyncThunk(
  "opportunity/createInterview",
  async (payload: CreateInterviewPayload, { rejectWithValue }) => {
    try {
      const interview = await opportunityService.createInterview(
        payload.opportunityId,
        payload.interview
      );

      return { interview, opportunityId: payload.opportunityId };
    } catch (error) {
      return rejectWithValue("Erreur lors de la création de l'entretien");
    }
  }
);

interface UpdateInterviewPayload {
  opportunityId: string;
  interview: Interview;
}

export const updateInterview = createAsyncThunk(
  "opportunity/updateInterview",
  async (payload: UpdateInterviewPayload, { rejectWithValue }) => {
    try {
      const interview = await opportunityService.updateInterview(
        payload.opportunityId,
        payload.interview
      );

      return { interview, opportunityId: payload.opportunityId };
    } catch (error) {
      return rejectWithValue("Erreur lors de la création de l'entretien");
    }
  }
);

interface DeleteInterviewPayload {
  opportunityId: string;
  interviewId: string;
}

export const deleteInterview = createAsyncThunk(
  "opportunity/deleteInterview",
  async (payload: DeleteInterviewPayload, { rejectWithValue }) => {
    try {
      await opportunityService.deleteInterview(
        payload.opportunityId,
        payload.interviewId
      );

      return {
        interviewId: payload.interviewId,
        opportunityId: payload.opportunityId,
      };
    } catch (error) {
      return rejectWithValue("Erreur lors de la suppression de l'entretien");
    }
  }
);

const opportunitySlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getOpportunities.fulfilled,
        (state: any, action: PayloadAction<Opportunity[]>) => {
          state.opportunities = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getOpportunities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getOpportunities.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        getOpportunity.fulfilled,
        (state, action: PayloadAction<Opportunity>) => {
          state.currentOpportunity = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getOpportunity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOpportunity.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteOpportunity.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOpportunity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        createOpportunity.fulfilled,
        (state, action: PayloadAction<Opportunity>) => {
          state.isLoading = false;
          state.opportunities.push(action.payload);
        }
      )
      .addCase(createOpportunity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        updateOpportunity.fulfilled,
        (state, action: PayloadAction<Opportunity>) => {
          state.isLoading = false;
          state.opportunities = state.opportunities.map((item) =>
            item.id == action.payload.id ? action.payload : item
          );
        }
      )
      .addCase(updateOpportunity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateOpportunity.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(createInterview.fulfilled, (state, action) => {
        const { opportunityId, interview } = action.payload;
        const opportunityIndex = state.opportunities.findIndex(
          (opportunity) => opportunity.id === opportunityId
        );
        if (opportunityIndex !== -1) {
          const updatedInterviews = [
            ...state.opportunities[opportunityIndex]!.interviews!,
            interview,
          ];
          const updatedOpportunity = {
            ...state.opportunities[opportunityIndex],
            interviews: updatedInterviews,
          };
          state.opportunities[opportunityIndex] = updatedOpportunity;
        }
      })
      .addCase(createInterview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createInterview.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(updateInterview.fulfilled, (state, action) => {
        const { interview, opportunityId } = action.payload;
        const opportunityIndex = state.opportunities.findIndex(
          (opportunity) => opportunity.id === opportunityId
        );
        if (opportunityIndex !== -1) {
          state.opportunities[opportunityIndex].interviews = 
            state.opportunities[opportunityIndex].interviews!.map((existingInterview) =>
              existingInterview.id === interview.id ? interview : existingInterview
          );
        }
        state.isLoading = false;
      })
      .addCase(updateInterview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInterview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Add this extra reducer for deleteInterview
      .addCase(deleteInterview.fulfilled, (state, action) => {
        const { interviewId, opportunityId } = action.payload;
        const opportunityIndex = state.opportunities.findIndex(
          (opportunity) => opportunity.id === opportunityId
        );
        if (opportunityIndex !== -1) {
          state.opportunities[opportunityIndex].interviews = 
            state.opportunities[opportunityIndex].interviews!.filter((existingInterview) =>
              existingInterview.id !== interviewId
          );
        }
        state.isLoading = false;
      })
      .addCase(deleteInterview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInterview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const {} = opportunitySlice.actions;
export default opportunitySlice.reducer;
