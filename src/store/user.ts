import { persist } from 'zustand/middleware';
import { create } from 'zustand';

import { IUserData } from '../actions/user';

export interface IUserStore {
    user: IUserData | null;
    setUser: (user: IUserData | null) => void;
};

const useUserStore = create<IUserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
        }),
        {
            name: 'user-store',
            getStorage: () => localStorage,
        }
    )
);
export default useUserStore;