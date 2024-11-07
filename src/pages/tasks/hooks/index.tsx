import React, { useContext, createContext, useState, useEffect, useCallback } from 'react';
import { TasksContextProps, TasksProps } from './types';
import { defaultValues } from './defaultValues';
import { getAllTasks } from '../../../actions/task';

const initialConfig = {
  ...defaultValues,
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

  const getTasksData = async () => {
    try {
      updateState({ loading: true });
      const response = await getAllTasks();
      if ('error' in response) return;
      
      updateState({
        defaultTasks: response,
        tasks: response,
        loading: false,
      });
    } catch (error) {
      updateState({ loading: false });
    }
  };

  useEffect(() => {
    getTasksData();
  }, []);

  const value = {
    ...state,
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