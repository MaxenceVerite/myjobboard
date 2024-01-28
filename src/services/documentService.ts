import { Document, DocumentType } from "../models/document";
import {
  getDocuments as getDocumentsApi,
  uploadDocument as uploadDocumentApi,
  downloadDocument as downloadDocumentApi
} from "../api/myJobBoard/features/documents/documentsApi"


const getDocumentsHeaders = async ()=> {
    
}


const getDocumentById = async (id:string) =>  {
    
}

const getDocumentsByType = async (type: DocumentType): Promise<Document[]> => {
   return await getDocumentsApi({type:type});

}

const uploadDocument = async (file:File, type: DocumentType, customName?: string | undefined) : Promise<string> => {
  return await uploadDocumentApi(file, type, customName);
}

const downloadDocument = async(documentId: string): Promise<void> => {
  return await downloadDocumentApi(documentId);
}


export {
    getDocumentsHeaders,
    getDocumentById,
    getDocumentsByType,
    uploadDocument,
    downloadDocument
}