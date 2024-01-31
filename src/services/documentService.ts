import { Document, DocumentType } from "../models/document";
import {
  getDocuments as getDocumentsApi,
  uploadDocument as uploadDocumentApi,
  downloadDocument as downloadDocumentApi,
  deleteDocument as deleteDocumentApi
} from "../api/myJobBoard/features/documents/documentsApi"




const getDocumentsByType = async (type: DocumentType): Promise<Document[]> => {
   return await getDocumentsApi({type:type});

}

const uploadDocument = async (file:File, type: DocumentType, customName?: string | undefined) : Promise<string> => {
  return await uploadDocumentApi(file, type, customName);
}

const downloadDocument = async(documentId: string): Promise<Blob> => {
  return await downloadDocumentApi(documentId);
}

const deleteDocument = async(documentId: string): Promise<void> => {
  return await deleteDocumentApi(documentId);
}


export {
    getDocumentsByType,
    uploadDocument,
    downloadDocument,
    deleteDocument
}