import Opportunity from "../models/opportunities/Opportunity";
import { 
    getOpportunity as getOpportunityApi,
    getOpportunities as getOpportunitiesApi,
    updateOpportunity as updateOpportunityApi,
    deleteOpportunity as deleteOpportunityApi


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


export {
    getOpportunities,
    getOpportunity,
    updateOpportunity,
    deleteOpportunity
}
