export  interface Document {
    id : string,
    type: DocumentType
    path: string,
    name: string,
    uploadedDate: string
}


export enum DocumentType{
CV = "CV",
MOTIVATION_LETTER = "MOTIVATION_LETTER",
}