import { persist } from 'zustand/middleware';
import { create } from 'zustand';

import { ISpaceData } from '../actions/space';

export interface ICompanyStore {
    company: ISpaceData | null;
    setCompany: (user: ISpaceData | null) => void;
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