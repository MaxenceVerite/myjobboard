
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import * as companyService from '../../services/companyService';
import Company from '../../models/opportunities/Company';


interface CompanyState {
    companies: Company[],
    isLoading: boolean,
    error?: string 
}

const initialState: CompanyState = {
    companies: [],
    isLoading: false
}

export const getCompanies = createAsyncThunk(
    'company/getCompanies',
    async (_, { rejectWithValue }) => {
      try {
        const companies = await companyService.getCompanies();
        return companies;
      } catch (error) {
        return rejectWithValue('Erreur lors de la récupération des entreprises de l\'utilisateur');
      }
    }
  );


interface CreateCompanyPayload{
    company: Company
}

  export const createCompany = createAsyncThunk(
    'company/createCompany',
    async (payload: CreateCompanyPayload, { rejectWithValue }) => {
      try {
        console.log("create company")
        var result = await companyService.createCompany(payload.company);

        return result;
      } catch (error) {
        return rejectWithValue('Erreur lors de la création de l\'entreprise');
      }
    }
  );


const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(
        getCompanies.fulfilled, 
        (state, action: PayloadAction<Company[]>) => {
            state.companies = action.payload;
            state.isLoading = false;
        }
    )
    .addCase(
        getCompanies.pending, 
        (state) => {
            state.isLoading = true;
        }
    )
    .addCase(
        getCompanies.rejected,
        (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    )
    .addCase(
        createCompany.fulfilled, 
        (state, action: PayloadAction<Company>) => {
            state.companies.push(action.payload);
            state.isLoading = false;
        }
    )
    .addCase(
        createCompany.pending, 
        (state) => {
            state.isLoading = true;
        }
    )
    .addCase(
        createCompany.rejected,
        (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    )
  },
});

export const { } = companySlice.actions;
export default companySlice.reducer;
