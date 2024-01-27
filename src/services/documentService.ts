import { Document, DocumentType } from "../models/document";
import {
  getDocuments as getDocumentsApi,
  uploadDocument as uploadDocumentApi
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



export {
    getDocumentsHeaders,
    getDocumentById,
    getDocumentsByType,
    uploadDocument
}