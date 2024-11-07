
/*
import React, { useContext, createContext, useState, useEffect } from 'react';

import {
  getCategoriesByCompanyId,
  createCategory,
  deleteCategory,
  updateCategory,
  updateCategoryOrder,
} from '@/app/services/products/categoriesService.ts';
import {
  CategoriesContextProps,
  CategoriesFilters,
  CategoriesProps,
  TasksContextProps,
  TasksProps,
} from './types';
import useAccessCompany from '@/app/hooks/accessToken/useAccessCompany';
import { defaultValues } from './defaultValues';
import Layout from '@/app/components/Layout';

const initialConfig = {
  ...defaultValues,
  updateState: () => {},
};

const CategoriesContext = createContext<TasksContextProps>(initialConfig);

export const TasksProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  const [state, setState] = useState<TasksProps>(defaultValues);

  const updateState = (newState: Partial<TasksProps>) => {
    setState((prevState: TasksProps) => ({
      ...prevState,
      ...newState,
    }));
  };

  const updateCategoriesOrder = async (newState: {
    [status: string]: Category[];
  }) => {
    try {
      const mappedItems: Category[] = [];

      Object.keys(newState).map((status) =>
        newState[status].map((category, index) =>
          mappedItems.push({
            ...category,
            order: index + 1,
            active: status === 'active',
          }),
        ),
      );

      updateState({ loading: true });

      updateCategoryOrder(mappedItems).then(() => getCategoriesData({}));

      updateState({ loading: false });

      Layout.Notify({
        message: 'Categoria atualizada!',
        type: 'success',
        theme: 'light',
      });
    } catch (error) {
      updateState({ loading: false });

      Layout.Notify({
        message: 'Erro ao atualizar a categoria!',
        type: 'error',
        theme: 'dark',
      });
    }
  };

  const getCategoriesData = async ({
    ignoreRequest,
    filters,
  }: {
    ignoreRequest?: boolean;
    filters?: CategoriesFilters;
  }) => {
    try {
      updateState({ loading: true });

      if (!ignoreRequest) {
        const response = await getCategoriesByCompanyId(companyId, '');

        updateState({
          loading: false,
          defaultCategories: response,
          rawCategories: response,
        });
      } else {
        const searchText = (filters?.search as string)?.trim().toLowerCase();

        const applyTextFilter = (categories: typeof state.rawCategories) =>
          categories.filter(
            (category) =>
              !searchText ||
              (category.name as string).toLowerCase().includes(searchText),
          );

        const defaultCategoriesResponse = applyTextFilter(state.rawCategories);

        updateState({
          loading: false,
          filters,
          defaultCategories: defaultCategoriesResponse,
        });
      }
    } catch (error) {
      updateState({ loading: false });

      Layout.Notify({
        message: 'Não foi possível obter as categorias',
        type: 'error',
        theme: 'dark',
      });
    }
  };

  useEffect(() => {
    if (accessCompany && accessCompany.id) {
      setCompanyId(accessCompany.id);
    }
  }, [accessCompany]);

  useEffect(() => {
    if (companyId) {
      getCategoriesData({});
    }
  }, [companyId]);

  const value = {
    ...state,
    updateCategoriesOrder,
    createCategoryHandler,
    deleteCategoryHandler,
    updateCategoryHandler,
    updateFilters,
    updateState,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

const useCategory = () => useContext(CategoriesContext);

export default useCategory;
*/