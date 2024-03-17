import { DocumentType } from "../../../../models/document"
import myJobBoardClient from "../../apiClient";
import { Document } from "../../../../models/document";
import FilterCriteriasBuilder, { FilterCriteriaOperator } from "../../utils/FilterCriteriasBuilder";



interface DocumentFilter{
    userId?: string,
    type?: DocumentType
}

const getDocuments = async (filter?: DocumentFilter): Promise<Document[]> => {
    try {
        const params: any = {};

       
        
        var filterCriteriasBuilder = new FilterCriteriasBuilder();
        var encodedFilterCriteria = filterCriteriasBuilder.addCriteria("type", FilterCriteriaOperator.eq, filter?.type)
                                                          .buildQueryString();

        params.filterCriterias = encodedFilterCriteria;

        const response = await myJobBoardClient.get<Document[]>(`api/documents`, {
            params: params
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des documents:", error);
        throw error;
    }
};

const uploadDocument = async(file:File,  type: DocumentType, customName: string|undefined): Promise<string> => {
    const formData = new FormData();
        formData.append('file', file);
        formData.append('documentType', type);

        if(customName)
            formData.append('customName', customName);
        
    
        try {
            const response = await myJobBoardClient.post(`api/documents/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.documentId;
        } catch (error) {
            console.error("Erreur lors de l'upload du document", error);
            throw error;
        }
}

const downloadDocument = async(documentId: string): Promise<Blob> => {
    try {
        const response = await myJobBoardClient.get(`api/documents/${documentId}/download`, {
          responseType: 'blob'
        });
        
        return new Blob([response.data], { type: response.headers['content-type'] });
      } catch (error) {
        console.error('Erreur lors du téléchargement du document:', error);
        throw error;
      }
}

const deleteDocument = async(documentId: string) : Promise<string> => {
    try {

       await myJobBoardClient.delete(`api/documents/${documentId}`);
       return documentId;
    } catch (error) {
        console.error("Erreur lors de la suppression d'un document:", error);
        throw error;
    }
}

const updateDocument = async(document: Document) : Promise<Document> => {
    try {

       const response = await myJobBoardClient.put(`api/documents/${document.id}`, document);
       return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour d'un document:", error);
        throw error;
    }
}




export {
    getDocuments,
    uploadDocument,
    downloadDocument,
    deleteDocument,
    updateDocument
}