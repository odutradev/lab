import axios from 'axios';

import { getUser, IUserData, IUserSpaceData } from './user.ts';
import setSpaceToken from '../services/setSpaceToken.ts';
import useUserStore from '../store/user.ts';
import api from '../services/api.ts';

export interface ISpaceData {
    name: string;
    creator: string;
    status: string;
    description?: string;
    createAt: Date;
    images?: {
      avatar?: string;
      banner?: string;
    };
    payload?: {
      redirect?: string;
    };
    _id: string;
};

interface ISpaceCreate {
    name: string
};

interface ResponseError  {
    error: string;
};

type SpaceAndUserOrError = { space: IUserSpaceData, user: IUserData} | ResponseError;
type SpaceUsersOrError = IUserData[] | ResponseError;
type SpaceOrError = IUserSpaceData | ResponseError;
type AllSpaceOrError = ISpaceData | ResponseError;

export const getSpace = async (spaceID?: string): Promise<SpaceOrError> => {
    try {
        if (spaceID) setSpaceToken(spaceID);
        const response = await api.get("/space/get");
        const data =  response.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const getSpaceUsers = async (): Promise<SpaceUsersOrError> => {
    try {
        const response = await api.get("/space/users");
        const data =  response.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const getSpaceUsersById = async (spaceID: string): Promise<SpaceUsersOrError> => {
    try {
        const response = await api.get("/space/users/" + spaceID);
        const data =  response.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const getSpaceById = async (spaceID: string): Promise<AllSpaceOrError> => {
    try {
        const response = await api.get("/space/get/" + spaceID);
        const data =  response.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const updateSpace = async (data: Partial<ISpaceData>): Promise<AllSpaceOrError> => {
    try {
        const response = await api.put("/space/update/", { data });
        getUser();
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const updateSpaceById = async (spaceID: string, data: Partial<ISpaceData>): Promise<AllSpaceOrError> => {
    try {
        const response = await api.put("/space/update/" + spaceID, { data });
        getUser();
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};
export const deleteSpaceById = async (spaceID: string): Promise<{ success: boolean } | ResponseError> => {
    try {
        const response = await api.delete("/space/delete/" + spaceID);
        getUser();
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const createSpace = async (data: ISpaceCreate): Promise<SpaceAndUserOrError> => {
    try {
        const response = await api.post("/space/create", data);
        const responseData =  response.data;
        setSpaceToken(responseData.space._id);
        const user = responseData.user;
        if (user){
            const { setUser } = useUserStore.getState();
            setUser(user as IUserData);
        };
        return responseData;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};