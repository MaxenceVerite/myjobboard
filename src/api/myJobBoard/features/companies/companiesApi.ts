import Company from "../../../../models/opportunities/Company";
import myJobBoardApiClient from "../../apiclient";

const companiesRessourcePath = "/api/companies";

const getCompanies = async(): Promise<Company[]>=> {
    try{
    var response = await myJobBoardApiClient.get(`${companiesRessourcePath}`);

    return response.data;
    }catch(error){
        console.log("Impossible de récupérer les entreprises : " + error)
        throw error;
    }
}

const createCompany = async(company: Company): Promise<Company>=> {
    try{
    var response = await myJobBoardApiClient.post(`${companiesRessourcePath}`, company);

    return response.data;
    }catch(error){
        console.log("Impossible de créer l'entreprise : " + error)
        throw error;
    }
}


export {
    getCompanies,
    createCompany
}