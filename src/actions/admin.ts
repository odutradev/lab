import axios from 'axios';

import { IUserData } from './user.ts';
import api from '../services/api.ts';

interface ResponseError  {
    error: string;
};

export const getAllUsers = async (): Promise<IUserData[] | ResponseError> => {
    try {
        const response = await api.get("/admin/user/get-all");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const getAllPendingUsers = async (): Promise<IUserData[] | ResponseError> => {
    try {
        const response = await api.get("/admin/user/get-all-pending");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const getUserById = async (userID: string): Promise<IUserData | ResponseError> => {
    try {
        const response = await api.get("/admin/user/get/" + userID);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const updateUserById = async (userID: string): Promise<IUserData | ResponseError> => {
    try {
        const response = await api.put("/admin/user/update/" + userID);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const approveUser = async (userID: string): Promise<IUserData | ResponseError> => {
    try {
        const response = await api.put("/admin/user/approve/" + userID);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const disapproveUser = async (userID: string): Promise<IUserData | ResponseError> => {
    try {
        const response = await api.put("/admin/user/disapprove/" + userID);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const deleteUser = async (userID: string): Promise<IUserData | ResponseError> => {
    try {
        const response = await api.delete("/admin/user/delete/" + userID);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};