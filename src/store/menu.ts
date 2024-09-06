import { persist } from 'zustand/middleware';
import { create } from 'zustand';

import { IUserSpaceData } from '../actions/user';

export interface IMenuData {
    drawerOpen: boolean;
    pastes: {
        default: {
            open: boolean;
        },
        admin: {
            open: boolean;
        },
        routine: {
            open: boolean;
        },
    };
    spaces: IUserSpaceData[];
    selectedSpace: string;
};

export interface IMenuStore {
    menu: IMenuData;
    updatePasteOpen: (pasteType: 'default' | 'admin' | 'routine', open: boolean) => void;
    updateSelectSpace: (selectedSpace: string) => void;
    updateSpaces: (spaces: IUserSpaceData[]) => void;
    updateDrawerOpen: (drawerOpen: boolean) => void;
    setMenu: (menu: IMenuData) => void;
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
        routine: {
            open: false,
        },
    },
    spaces: [],
    selectedSpace: ''
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
            updateSelectSpace: (selectedSpace) => set((state) => ({
                menu: {
                    ...state.menu,
                    selectedSpace
                },
            })),
            updateSpaces: (spaces) => set((state) => ({
                menu: {
                    ...state.menu,
                    spaces
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
