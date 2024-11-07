import React, { useContext, createContext, useState, useEffect, useCallback } from 'react';
import { GroupTasksByStatusProps, TasksContextProps, TasksProps } from './types';
import { defaultValues, statusCategories } from './defaultValues';
import { getAllTasks, ITaskAndSubs, updateAllTasks } from '../../../actions/task';
import { TaskStatusTypes } from '../types';

const initialConfig = {
  ...defaultValues,
  updateTasksOrder: () => {},
  updateState: () => {},
};

const TasksContext = createContext<TasksContextProps>(initialConfig);

export const TasksProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<TasksProps>(defaultValues);

  const updateState = useCallback((newState: Partial<TasksProps>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  }, []);

  const groupTasksByStatus = ({ tasks, statusCategories }: GroupTasksByStatusProps) =>
    statusCategories.map((status) => ({
      tasks: tasks.filter((task) => task.status === status),
      status,
  }));

  const getTasksData = async () => {
    try {
      updateState({ loading: true });
      const response = await getAllTasks();
      if ('error' in response) return;

      const tasksByStatus = groupTasksByStatus({ tasks: response, statusCategories })
      
      updateState({
        defaultTasks: response,
        tasksByStatus,
        tasks: response,
        loading: false,
      });
    } catch (error) {
      updateState({ loading: false });
    }
  };

  const updateTasksOrder = async (newTasks: ITaskAndSubs[]) => {
    const tasksByStatus = groupTasksByStatus({ tasks: newTasks, statusCategories });
  
    tasksByStatus.forEach((item) =>
      item.tasks.forEach((task, index) => {
        const taskIndex = newTasks.findIndex((x) => x._id === task._id);
        newTasks[taskIndex].status = item.status as TaskStatusTypes;
        newTasks[taskIndex].order = index;
      })
    );
  
    updateState({ tasks: newTasks, tasksByStatus });
    updateAllTasks(newTasks);
  };

  useEffect(() => {
    getTasksData();
  }, []);

  const value = {
    ...state,
    updateTasksOrder,
    updateState,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => useContext(TasksContext);

export default useTasks;