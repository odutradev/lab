import { ReactNode } from "react";

import { IUserSpaceData } from "../../actions/user";

export type MenuLink = [JSX.Element, string, string]; 

export interface MenuItemProps {
    icon: React.ReactNode;
    drawerOpen: boolean;
    route: string;
    text: string;
};

export interface SpaceSelectProps {
    handleSpaceChange: (value: IUserSpaceData) => void;
    disableGetUser: boolean;
    drawerOpen: boolean;
};
  
export interface LayoutProps {
    updateSpace?: (spaceId?: string) => void;
    loading?: boolean | string;
    disableGetUser?: boolean;
    children: ReactNode;
    title?: string;
  }