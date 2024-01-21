export  interface Document {
    id : string,
    type: DocumentType
    path: string,
    name: string,
    creationDate: string
}


export enum DocumentType{
CV,
LETTRE_MOTIVATION,

}