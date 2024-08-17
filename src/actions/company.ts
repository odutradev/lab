import axios from 'axios';

import setCompanyToken from '../services/setCompanyToken.ts';
import api from '../services/api.ts';
import { getUser } from './user.ts';

export interface ICompanyData {
    name: string;
    activeAt?: Date;
    createAt: Date;
    permissions: String[];
    status: 'active' | 'inactive';
    _id: string;
    contact?: String;
	description?: String;
    payload?:{
        redirect?: string;
    };
    images: {
        avatar?: string;
        banner?: string;
    };
};

interface ICompanyCreate {
    name: string
};

interface ResponseError  {
    error: string;
};

type CompanyOrError = ICompanyData | ResponseError;

export const getCompany = async (companyID?: string): Promise<CompanyOrError> => {
    try {
        if (companyID) setCompanyToken(companyID);
        const response = await api.get("/company/get");
        const data =  response.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const getPublicCompanies = async (): Promise<ICompanyData[] | ResponseError> => {
    try {
        const response = await api.get("/company/get/public");
        const data =  response.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const createCompany = async (data: ICompanyCreate): Promise<CompanyOrError> => {
    try {
        const response = await api.post("/company/create", data);
        const responseData =  response.data;
        setCompanyToken(responseData.company._id);
        getUser();
        return responseData.company;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};