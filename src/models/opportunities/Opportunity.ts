import Interlocutor from "./Interlocutor"

export default interface Opportunity{
    id?: string,
    roleTitle: string,
    compagnyId: string,
    compagnyName: string,
    startDate: Date,
    lastUpdateDate: Date,
    state: OpportunityState,
    steps: OpportunityStep
}



export enum OpportunityState{
    Applied, // A postuler, attend une proposition d'entretien
    Interviewing, // Passe des entretiens
    WaitingForPropositions, // Plus aucun entretien a passé, il ne reste plus qu'à attendre une réponse
    Aborted, // Process annulée ou absence de réponse du recruteur
    Refused, // Opportunité refusée
    Validated // Opportunité validé
}

export interface OpportunityStep{
   id?: string,
   dueDate: Date,
   freeNotes?: string, 
}


export interface Interview extends OpportunityStep {
    interlocutors: Interlocutor
}

export interface TechnicalInterview extends Interview {

}

export interface HRInterview extends Interview{
    discussedRemote?: number,
    negociatedMinSalary?: number,
    negociatedMaxSalary?: number,

}





