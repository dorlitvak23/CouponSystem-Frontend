import CompanyUserModel from "../Models/CompanyUserModel";
import CustomerUserModel from "../Models/CustomerUserModel";
import appConfig from "../Utils/AppConfig";
import tokenAxios from "../Utils/Interceptors";

const adminUrl = appConfig.adminUrl;

export async function addCompanyApi(company: CompanyUserModel) {
    return await tokenAxios.post<CompanyUserModel>(adminUrl+"company", company)
}


export async function removeCompanyApi(companyId: number) {
    return await tokenAxios.delete<any>(adminUrl+"company/"+companyId);
}

export async function getAllCompaniesApi() {
    return await tokenAxios.get<CompanyUserModel[]>(adminUrl+"company/all");
}

export async function getCompanyApi(companyId: number) {
    return await tokenAxios.get<CompanyUserModel>(adminUrl+"company"+companyId);
}

export async function updateCompanyApi(company: CompanyUserModel) {
    return await tokenAxios.put<CompanyUserModel>(adminUrl+"company", company);
}

// customers

export async function addCustomerApi(customer: CustomerUserModel) {
    return await tokenAxios.post<CustomerUserModel>(adminUrl+"customer", customer)
}

export async function removeCustomerApi(customerId: number) {
    return await tokenAxios.delete<any>(adminUrl+"customer/"+customerId);
}

export async function getAllCustomersApi() {
    return await tokenAxios.get<CustomerUserModel[]>(adminUrl+"customer/all");
}

export async function getCustomerApi(customerId: number) {
    return await tokenAxios.get<CustomerUserModel>(adminUrl+"customer"+customerId);
}

export async function updateCustomerApi(customer: CustomerUserModel) {
    return await tokenAxios.put<CustomerUserModel>(adminUrl+"customer",customer);
}