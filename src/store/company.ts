import { persist } from 'zustand/middleware';
import { create } from 'zustand';

import { ICompanyData } from '../actions/company';

export interface ICompanyStore {
    company: ICompanyData | null;
    setCompany: (user: ICompanyData | null) => void;
};

const useCompanyStore = create<ICompanyStore>()(
    persist(
        (set) => ({
            company: null,
            setCompany: (company) => set({ company }),
        }),
        {
            name: 'company-store',
            getStorage: () => localStorage,
        }
    )
);
export default useCompanyStore;