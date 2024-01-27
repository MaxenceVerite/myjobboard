import { DocumentType } from "../../../../models/document"
import myJobBoardClient from "../../apiclient";
import { Document } from "../../../../models/document";
const getDocumentsEndpointPath = "/documents";

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




export {
    getDocuments
}