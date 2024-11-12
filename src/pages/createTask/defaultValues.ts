import { ITaskCreate } from "../../actions/task";

export const defaultCreateTask: ITaskCreate = {
    scheduling: undefined,
    deadline: undefined,
    priority: 'low',
    description: '',
    content: '',
  };