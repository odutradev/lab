import { TasksProps } from './types';

export const statusCategories = ['inactive', 'blocked', 'pending', 'active', 'completed'];

export const defaultValues: TasksProps = {
    defaultTasks: [],
    tasksByStatus: [],
    loading: false,
    tasks: [],
};