import axios from 'axios';

import setAuthToken from '../services/setAuthToken.ts';
import api from '../services/api.ts';

export interface ISignInData {
    email: string;
    password: string;
};

export interface IUserCompanyData {
    id: string;
    name: string;
    entryDate: Date;
    permissions: String[];
    _id: string;
};

export interface IUserData {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'normal';
    status: 'logged' | 'registered';
    permissions: String[];
    createAt: Date;
    loggedAt?: Date;
    companies: IUserCompanyData[];
    contact?: string;
    description?: string;
    payload?:{
        redirect?: string;
    };
    images: {
        avatar?: string;
        banner?: string;
    };
};

interface ResponseError  {
    error: string;
};

type UserOrError = IUserData | ResponseError;

export const signIn = async (data: ISignInData): Promise<UserOrError> => {
    try {
        const response = await api.post("/user/signin", data);
        const responseData =  response.data;
        setAuthToken(responseData?.token);
        const user = await getUser();
        return user;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const signUp = async () => {
    try {
        const response = await api.post("", {});
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};


export const getUser = async (): Promise<IUserData | ResponseError> => {
    try {
        const response = await api.get("/user/me");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};