import { Document, DocumentType } from "../models/document";
import {
  getDocuments as getDocumentsApi,
  uploadDocument as uploadDocumentApi,
  downloadDocument as downloadDocumentApi,
  deleteDocument as deleteDocumentApi,
  updateDocument as updateDocumentApi
} from "../api/myJobBoard/features/documents/documentsApi"


const getAllDocuments = async (): Promise<Document[]> => {
  return await getDocumentsApi();

}

const getDocumentsByType = async (type: DocumentType): Promise<Document[]> => {
   return await getDocumentsApi({type:type});

}

const uploadDocument = async (file:File, type: DocumentType, customName?: string | undefined) : Promise<string> => {
  return await uploadDocumentApi(file, type, customName);
}

const downloadDocument = async(documentId: string): Promise<Blob> => {
  return await downloadDocumentApi(documentId);
}

const deleteDocument = async(documentId: string): Promise<string> => {
  var response = await deleteDocumentApi(documentId);

  return response;
}

const updateDocument = async(document: Document): Promise<Document> => {
  var response = await updateDocumentApi(document);

  return response;
}


export {
    getDocumentsByType,
    uploadDocument,
    downloadDocument,
    deleteDocument,
    getAllDocuments,
    updateDocument
}