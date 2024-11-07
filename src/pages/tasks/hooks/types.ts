import { ITaskAndSubs  } from "../../../actions/task";
  
export interface TasksProps  {
    activeOverlayTask?: ITaskAndSubs;
    defaultTasks: ITaskAndSubs[];
    tasks: ITaskAndSubs[];
    createModal: boolean;
    loading: boolean;
};
  
export type TasksContextProps = {
    updateState: (newState: Partial<TasksProps>) => void;
} & TasksProps;
  