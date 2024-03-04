import myJobBoardApiClient from "../../apiclient"
import Opportunity, { Interview } from "../../../../models/opportunities/Opportunity"

const opportunitiesRessourcePath = "api/opportunities"


const getOpportunities = async(): Promise<Opportunity[]>=> {
    try{
    var response = await myJobBoardApiClient.get(`${opportunitiesRessourcePath}`);

    return response.data;
    }catch(error){
        console.log("Impossible de récupérer les opportunités : " + error)
        throw error;
    }
}

const updateOpportunity = async(opportunity: Opportunity) : Promise<Opportunity> => {
    try{
    var response = await myJobBoardApiClient.put(`${opportunitiesRessourcePath}/${opportunity.id}`, opportunity)

    return response.data
    }catch(error){
        console.log("Impossible de mettre à jour l'opportunité : " + error)
        throw error;
    }
}

const deleteOpportunity = async(opportunity: Opportunity) : Promise<void> => {
    try{
        await myJobBoardApiClient.delete(`${opportunitiesRessourcePath}/${opportunity.id}`)
    }catch(error){
        console.log("Impossible de supprimer l'opportunité : " + error)
        throw error;
    }
}

const getOpportunity = async(id: string) : Promise<Opportunity> => {
    try{
        var response = await myJobBoardApiClient.get(`${opportunitiesRessourcePath}/${id}`)
        return response.data
    }catch(error){
        console.log("Impossible de supprimer l'opportunité : " + error)
        throw error;
    }
}

const createOpportunity = async(opportunity: Opportunity): Promise<Opportunity> => {

    try{
        var response = await myJobBoardApiClient.post(`${opportunitiesRessourcePath}`, opportunity)

        return response.data
    }catch(error){
        console.log("Impossible de créer l'opportunité : " + error)
        throw error;
    }


}

const createInterview = async(opportunityId: string, interview: Interview): Promise<Interview> => {
    try{
        var response = await myJobBoardApiClient.post(`/api/opportunities/${opportunityId}/interviews`, interview)

        return response.data
    }catch(error){
        console.log("Impossible de créer l'entretien : " + error)
        throw error;
    }
}

const deleteInterview = async(opportunityId: string, interviewId: string): Promise<void> => {
    try{
        await myJobBoardApiClient.delete(`/api/opportunities/${opportunityId}/interviews/${interviewId}`, )

        
    }catch(error){
        console.log("Impossible de créer l'entretien : " + error)
        throw error;
    }
}

export {
    getOpportunities,
    getOpportunity,
    updateOpportunity,
    deleteOpportunity,
    createOpportunity,
    createInterview
}