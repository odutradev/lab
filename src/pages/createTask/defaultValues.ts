import { ITaskCreate } from "../../actions/task";

export const defaultCreateTask: ITaskCreate = {
    scheduling: new Date(),
    deadline: new Date(),
    priority: 'low',
    description: '',
    content: '',
  };