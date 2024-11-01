import axios from 'axios';

import api from '../services/api.ts';

export interface ITask {
    status: 'active' | 'inactive' | 'completed' | 'pending' | 'blocked';
    priority: 'high' | 'medium' | 'low';
    identificator: number;
    description: string;
    lastUpdate?: Date;
    scheduling?: Date;
    content?: string;
    parent?: string;
    deadline?: Date;
    creator: string;
    createAt: Date;
    startIn?: Date;
    index?: number;
    space: string;
    endIn?: Date;
    _id: string;
};

export type ITaskAndSubs = ITask & {
    subs?: ITask[];
};

interface ITaskCreate {
    priority?: 'high' | 'medium' | 'low';
    description: string;
    scheduling?: Date;
    content?: string;
    parent?: string;
    deadline?: Date;
    index?: number;
};
  
interface ResponseError  {
    error: string;
};

type TasksAndSubsOrError = ITaskAndSubs[] | ResponseError;
type TaskAndSubsOrError = ITaskAndSubs | ResponseError;
type TaskOrError = ITask | ResponseError;

export const createTask = async (data: ITaskCreate): Promise<TaskOrError> => {
    try {
        const response = await api.post("/task/create", data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const getAllTasks = async (): Promise<TasksAndSubsOrError> => {
    try {
        const response = await api.get("/task/get");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const getTaskById = async (taskID: string): Promise<TaskAndSubsOrError> => {
    try {
        const response = await api.get("/task/get/" + taskID);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const updateTaskById = async (taskID: string, data: Partial<ITaskAndSubs>): Promise<TaskAndSubsOrError> => {
    try {
        const response = await api.put("/task/update/" + taskID, { data });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};

export const deleteTaskById = async (taskID: string): Promise<{ success: boolean} | ResponseError> => {
    try {
        const response = await api.delete("/task/delete/" + taskID);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.msg || 'Erro desconhecido' };
          }
          return { error: 'Erro na requisição' };
    }
};