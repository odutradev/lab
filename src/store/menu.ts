import { persist } from 'zustand/middleware';
import { create } from 'zustand';

export interface IMenuData {
    drawerOpen: boolean;
    pastes: {
        default: {
            open: boolean;
        },
        admin: {
            open: boolean;
        },
    };
};

export interface IMenuStore {
    menu: IMenuData;
    setMenu: (menu: IMenuData) => void;
    updateDrawerOpen: (drawerOpen: boolean) => void;
    updatePasteOpen: (pasteType: 'default' | 'admin', open: boolean) => void;
};

const defaultMenu: IMenuData = {
    drawerOpen: true,
    pastes: {
        default: {
            open: true,
        },
        admin: {
            open: false,
        },
    },
};

const useMenuStore = create<IMenuStore>()(
    persist(
        (set) => ({
            menu: defaultMenu,
            setMenu: (menu) => set({ menu }),
            updateDrawerOpen: (drawerOpen) => set((state) => ({
                menu: {
                    ...state.menu,
                    drawerOpen,
                },
            })),
            updatePasteOpen: (pasteType, open) => set((state) => ({
                menu: {
                    ...state.menu,
                    pastes: {
                        ...state.menu.pastes,
                        [pasteType]: {
                            open,
                        },
                    },
                },
            })),
        }),
        {
            name: 'menu-store',
            getStorage: () => localStorage,
        }
    )
);

export default useMenuStore;
