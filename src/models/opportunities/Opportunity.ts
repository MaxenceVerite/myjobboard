import Interlocutor from "./Interlocutor"
import Range from "../../valueObjects/Range"

export interface IAnnotable{
    freeNotes?: string
}

export default interface Opportunity extends IAnnotable{
    id?: string,
    roleTitle: string,
    industry?: string,
  
    remoteCondition?: RemoteCondition,
    location?: string,
    companyId?: string,
    startDate: Date,
    lastUpdateDate: Date,
    state: EOpportunityState,
    relatedApplication?: Application, // pas de vie en dehors de l'entité, relation 1-1 avec opport
    interviews?: Interview[], 
    offers?: Offer[]
    indicativeSalaryRange?: SalaryRange,
    associatedDocumentsId?: string[],
    userAppreciationLevel?: number,
    confidenceLevel?: number
}



export interface Interview extends IAnnotable {
    id?: string,
    interlocutorsId: string[],
    type: InterviewType,
    customType?: string,
    dueDate: Date,
    meetingCondition: MeetingConditions,

}



export interface Application extends IAnnotable {
    type: ApplicationType,
    customType?: string,
    expectedExperienceInYears?: Range,
    offerBudget?: SalaryRange,
    linkToJobOffer?: string,
}



export interface Offer extends IAnnotable{
    isCounterOffer: boolean,
    grossYearlySalary: number,
}


export interface SalaryRange extends Range{
    periodicity: Periodicity
}



export enum EOpportunityState{
    DRAFT= "DRAFT",
    APPLIED = "APPLIED", // A postuler, n'a encore aucun entretien de planifier
    INTERVIEWING = "INTERVIEWING", // A passé au moins un entretien
    NEGOCIATION_ON_OFFERS = "NEGOCIATION_ON_OFFERS", // A validé l'ensemble des entretiens, attend une offre qui lui convient
    ABORTED = "ABORTED", // Process annulée (absence de réponse du recruteur par exemple)
    REFUSED = "REFUSED", // Opportunité refusée par l'un des deux parties
    VALIDATED = "VALIDATED",  // Opportunité validé (acceptation d'une offre)
    ARCHIVED = "ARCHIVED"
}


export enum InterviewType{
    HR = "HR", 
    Technical = "Technical",
    Client = "Client",
    Other = "Other"
}

export enum MeetingConditions{
    Videocall = "VIDEOCALL", 
    Physical = "PHYSICAL"
}


export enum RemoteCondition {
    Remote = "Remote",
    Hybrid = "Hybrid",
    Office = "Office"
}

export  enum Periodicity{
    Yearly = "Yearly",
    Monthly = "Monthly",
    Daily = "Daily"
}

export enum ApplicationType{
    Spontaneous ="Spontaneous" , 
    JobOffer = "JobOffer"
}









