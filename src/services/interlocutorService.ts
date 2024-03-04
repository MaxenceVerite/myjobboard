
import { 
    getInterlocutor as getInterlocutorApi,
    deleteInterlocutor as deleteInterlocutorApi,
    updateInterlocutor as updateInterlocutorApi,
    getInterlocutors as getInterlocutorsApi,
    createInterlocutor as createInterlocutorApi

} from "../api/myJobBoard/features/interlocutors/interlocutorsApi";
import Interlocutor from "../models/opportunities/Interlocutor";

const getInterlocutor = async(id: string) : Promise<Interlocutor> => {

    return getInterlocutorApi(id);
}


const deleteInterlocutor = async(interlocutor: Interlocutor): Promise<void> => {
    return deleteInterlocutorApi(interlocutor);
}


const updateInterlocutor = async(interlocutor: Interlocutor) : Promise<Interlocutor> => {
    return updateInterlocutorApi(interlocutor);
}

const getInterlocutors = async(): Promise<Interlocutor[]> =>{
    return getInterlocutorsApi();
}

const createInterlocutor = async(interlocutor: Interlocutor): Promise<Interlocutor> => {
    return createInterlocutorApi(interlocutor);
}


export {
    getInterlocutors,
    deleteInterlocutor,
    getInterlocutor,
    createInterlocutor,
    updateInterlocutor
}
