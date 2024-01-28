import { DocumentType } from "../../../../models/document"
import myJobBoardClient from "../../apiclient";
import { Document } from "../../../../models/document";

const documentsRessourcePath = "/documents"
const getDocumentsEndpointPath = documentsRessourcePath;
const uploadDocumentEndpointPath = `${documentsRessourcePath}/upload`
const downloadDocumentEndpointPath = `${documentsRessourcePath}/download`

interface DocumentFilter{
    userId?: string,
    type?: DocumentType
}

const getDocuments = async (filter: DocumentFilter): Promise<Document[]> => {
    try {
        const params: any = {};
        if (filter.userId) {
            params.userId = filter.userId;
        }
        if (filter.type) {
            params.type = filter.type;
        }

        const response = await myJobBoardClient.get<Document[]>(`${getDocumentsEndpointPath}`, {
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
            const response = await myJobBoardClient.post(uploadDocumentEndpointPath, formData, {
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

const downloadDocument = async(documentId: string): Promise<void> => {
    try {
  
        await myJobBoardClient.get(`${downloadDocumentEndpointPath}`, {
            params: {id: documentId}
        });

    } catch (error) {
        console.error("Erreur lors du téléchargement d'un document:", error);
        throw error;
    }
}




export {
    getDocuments,
    uploadDocument,
    downloadDocument
}