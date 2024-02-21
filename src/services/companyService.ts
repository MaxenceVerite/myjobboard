import { getCompanies as getCompaniesApi,
         createCompany as createCompanyApi } from "../api/myJobBoard/features/companies/companiesApi";
import Company from "../models/opportunities/Company";

const getCompanies = async() => {

    return getCompaniesApi();

}


const createCompany = async(company : Company) => {
    return createCompanyApi(company);
}


export {
    getCompanies,
    createCompany
}