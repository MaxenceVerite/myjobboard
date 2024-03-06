import Opportunity, { Interview } from "../models/opportunities/Opportunity";
import { 
    getOpportunity as getOpportunityApi,
    getOpportunities as getOpportunitiesApi,
    updateOpportunity as updateOpportunityApi,
    deleteOpportunity as deleteOpportunityApi,
    createOpportunity as createOpportunityApi,
    createInterview as createInterviewApi,
    updateInterview as updateInterviewApi,
    deleteInterview as deleteInterviewApi

} from "../api/myJobBoard/features/opportunities/opportunitiesApi";

const getOpportunity = async(id: string) : Promise<Opportunity> => {

    return getOpportunityApi(id);
}


const deleteOpportunity = async(opportunity: Opportunity): Promise<void> => {
    return deleteOpportunityApi(opportunity);
}


const updateOpportunity = async(opportunity: Opportunity) : Promise<Opportunity> => {
    return updateOpportunityApi(opportunity);
}

const getOpportunities = async(): Promise<Opportunity[]> =>{
    return getOpportunitiesApi();
}

const createOpportunity = async(opportunity: Opportunity): Promise<Opportunity> => {
    return createOpportunityApi(opportunity);
}

const createInterview = async(opportunityId: string, interview: Interview): Promise<Interview> => {

    return createInterviewApi(opportunityId, interview);
}

const updateInterview = async(opportunityId: string, interview: Interview): Promise<Interview> => {

    return  updateInterviewApi(opportunityId, interview);
}

const deleteInterview = async(opportunityId: string, interviewId: string): Promise<void> => {

    return deleteInterviewApi(opportunityId, interviewId);
}

export {
    getOpportunities,
    getOpportunity,
    updateOpportunity,
    deleteOpportunity,
    createOpportunity,
    createInterview,
    updateInterview,
    deleteInterview
}
