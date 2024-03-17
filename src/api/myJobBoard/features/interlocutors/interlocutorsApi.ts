import myJobBoardApiClient from "../../apiClient"

import Interlocutor from "../../../../models/opportunities/Interlocutor";



const getInterlocutors = async(): Promise<Interlocutor[]>=> {
    try{
    var response = await myJobBoardApiClient.get(`/api/interlocutors`);

    return response.data;
    }catch(error){
        console.log("Impossible de récupérer les interlocuteurs : " + error)
        throw error;
    }
}

const updateInterlocutor = async(interlocutor: Interlocutor) : Promise<Interlocutor> => {
    try{
    var response = await myJobBoardApiClient.put(`/api/interlocutors/${interlocutor.id}`, interlocutor)

    return response.data
    }catch(error){
        console.log("Impossible de mettre à jour l'interlocuteur : " + error)
        throw error;
    }
}

const deleteInterlocutor = async(interlocutor: Interlocutor) : Promise<void> => {
    try{
        await myJobBoardApiClient.delete(`api/interlocutors/${interlocutor.id}`)
    }catch(error){
        console.log("Impossible de supprimer l'interlocuteur : " + error)
        throw error;
    }
}

const getInterlocutor = async(id: string) : Promise<Interlocutor> => {
    try{
        var response = await myJobBoardApiClient.get(`api/interlocutors/${id}`)

        return response.data
    }catch(error){
        console.log("Impossible de récupérer l'interlocuteur : " + error)
        throw error;
    }
}

const createInterlocutor = async(interlocutor: Interlocutor): Promise<Interlocutor> => {

    try{
        var response = await myJobBoardApiClient.post(`api/interlocutors`, interlocutor)

        return response.data
    }catch(error){
        console.log("Impossible de créer l'interlocuteur : " + error)
        throw error;
    }


}



export {
    getInterlocutors,
    getInterlocutor,
    updateInterlocutor,
    deleteInterlocutor,
    createInterlocutor
}