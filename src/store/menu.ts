import { persist } from 'zustand/middleware';
import { create } from 'zustand';

export interface IMenuData {
    drawerOpen: boolean;
    pastes:{
        default: {
            open: boolean;
        },
        admin: {
            open: boolean;
        },
    }
};

export interface IMenuStore {
    menu: IMenuData | null;
    setMenu: (user: IMenuData | null) => void;
};

const defaultMenu: IMenuData = {
    drawerOpen: true,
    pastes:{
        default: {
            open: true
        },
        admin: {
            open: false
        },
    }
}

const useMenuStore = create<IMenuStore>()(
    persist(
        (set) => ({
            menu: defaultMenu,
            setMenu: (menu) => set({ menu }),
        }),
        {
            name: 'menu-store',
            getStorage: () => localStorage,
        }
    )
);
export default useMenuStore;