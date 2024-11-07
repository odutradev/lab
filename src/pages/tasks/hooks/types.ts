import { ITaskAndSubs  } from "../../../actions/task";
  
export interface TaskByStatus {
    tasks: ITaskAndSubs[];
    status: string;
};

export interface GroupTasksByStatusProps {
    statusCategories: string[];
    tasks: ITaskAndSubs[];
};

export interface TasksProps  {
    activeOverlayTask?: ITaskAndSubs;
    tasksByStatus: TaskByStatus[];
    defaultTasks: ITaskAndSubs[];
    tasks: ITaskAndSubs[];
    createModal: boolean;
    loading: boolean;
};
  
export type TasksContextProps = {
    updateState: (newState: Partial<TasksProps>) => void;
} & TasksProps;
  