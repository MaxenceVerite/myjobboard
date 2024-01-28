import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Document, DocumentType } from "../../models/document";
import * as documentService from '../../services/documentService';

interface DocumentState {
  cvs: Document[];
  motivationLetters: Document[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DocumentState = {
  cvs: [],
  motivationLetters: [],
  isLoading: false,
  error: null,
};


export const fetchCVs = createAsyncThunk(
  'documents/fetchCVs',
  async (_, { rejectWithValue }) => {
    try {
      const cvs = await documentService.getDocumentsByType(DocumentType.CV);
      return cvs;
    } catch (error) {
      return rejectWithValue('Erreur lors de la récupération des CVs');
    }
  }
);

export const fetchMotivationLetters = createAsyncThunk(
  'documents/fetchMotivationLetters',
  async (_, { rejectWithValue }) => {
    try {
      const motivationLetters = await documentService.getDocumentsByType(DocumentType.LETTRE_MOTIVATION);
      return motivationLetters;
    } catch (error) {
      return rejectWithValue('Erreur lors de la récupération des lettres de motivation');
    }
  }
);

interface UploadDocumentPayload {
  type: DocumentType;
  file: File; 
  customName?: string;
}



export const uploadDocument = createAsyncThunk(
  'documents/uploadDocument',
  async (payload: UploadDocumentPayload, { rejectWithValue }) => {
    try {
      const uploadedDocumentId = await documentService.uploadDocument(payload.file, payload.type, payload.customName);
      return uploadedDocumentId;
    } catch (error) {
      return rejectWithValue('Erreur lors du téléversement du document');
    }
  }
);


interface DownloadDocumentPayload {
  documentId: string
}

export const downloadDocument = createAsyncThunk(
  'documents/uploadDocument',
  async (payload: DownloadDocumentPayload, { rejectWithValue }) => {
    try {
     await documentService.downloadDocument(payload.documentId);
    } catch (error) {
      return rejectWithValue('Erreur lors du téléchargement du document');
    }
  }
);


const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Traitement de l'état 'pending' pour la récupération des CVs
      .addCase(fetchCVs.pending, (state) => {
        state.isLoading = true;
      })
      // Traitement de l'état 'fulfilled' pour la récupération des CVs
      .addCase(fetchCVs.fulfilled, (state, action: PayloadAction<Document[]>) => {
        state.isLoading = false;
        state.cvs = action.payload;
      })
      // Traitement de l'état 'rejected' pour la récupération des CVs
      .addCase(fetchCVs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Cast le payload en string
      })
      // Traitement de l'état 'pending' pour la récupération des lettres de motivation
      .addCase(fetchMotivationLetters.pending, (state) => {
        state.isLoading = true;
      })
      // Traitement de l'état 'fulfilled' pour la récupération des lettres de motivation
      .addCase(fetchMotivationLetters.fulfilled, (state, action: PayloadAction<Document[]>) => {
        state.isLoading = false;
        state.motivationLetters = action.payload;
      })
      // Traitement de l'état 'rejected' pour la récupération des lettres de motivation
      .addCase(fetchMotivationLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; 
      });
  },
});

export const {  } = documentSlice.actions;
export default documentSlice.reducer;
