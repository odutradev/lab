import axios from 'axios';

import setSpaceToken from '../services/setSpaceToken.ts';
import api from '../services/api.ts';
import { getUser, IUserData, IUserSpaceData } from './user.ts';

interface ISpaceCreate {
    name: string
};

interface ResponseError  {
    error: string;
};

type SpaceOrError = IUserSpaceData | ResponseError;
type SpaceAndUserOrError = { space: IUserSpaceData, user: IUserData} | ResponseError;

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

export const createSpace = async (data: ISpaceCreate): Promise<SpaceAndUserOrError> => {
    try {
        const response = await api.post("/space/create", data);
        const responseData =  response.data;
        setSpaceToken(responseData.space._id);
        getUser();
        return responseData;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};