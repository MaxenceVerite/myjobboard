import { Document, DocumentType } from "../models/document";

const fakeCVs : Document[] = [
    {
        id: "aooaiidud-eekkd-alallk",
        name: "CV Coiffeur",
        type: DocumentType.CV,
        path: "/fakea",
        creationDate: "02-10-2023 10:00:0000"
    },
    {
        id: "aooaiidud-allsia-alallk",
        name: "CV Couvreur",
        type: DocumentType.CV,
        path: "/fakeb",
        creationDate: "03-10-2023 10:00:0000"
    },
    {
        id: "aooaiidud-oppozi-alallk",
        name: "CV Dentiste",
        type: DocumentType.CV,
        path: "/fakec",
        creationDate: "10-10-2023 10:00:0000"
    },
]

const fakeMotivationLetters : Document[] = [
    {
        id: "aooaiidud-eekkd-alallk",
        name: "Lettre de motivation Coiffeur Henin-Beaumont",
        type: DocumentType.LETTRE_MOTIVATION,
        path: "/fakea",
        creationDate: "02-10-2023 10:00:0000"
    },
    {
        id: "aooaiidud-allsia-alallk",
        name: "Lettre de motivation Couvreur Couvrechef",
        type: DocumentType.LETTRE_MOTIVATION,
        path: "/fakeb",
        creationDate: "03-10-2023 10:00:0000"
    },
    {
        id: "aooaiidud-oppozi-alallk",
        name: "Lettre de motivation Coiffeur HairPez",
        type: DocumentType.LETTRE_MOTIVATION,
        path: "/fakec",
        creationDate: "10-10-2023 10:00:0000"
    },
]

const getDocumentsHeaders = async ()=> {
    
}


const getDocumentById = async (id:string) =>  {
    return fakeCVs.concat(fakeMotivationLetters).find(c => c.id === id);
}

const getDocumentsByType = async (type: DocumentType): Promise<Document[]> => {

    return type === DocumentType.CV? fakeCVs: fakeMotivationLetters;
}



export {
    getDocumentsHeaders,
    getDocumentById,
    getDocumentsByType
}