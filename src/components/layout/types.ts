import { ReactNode } from "react";

export type PositionRequired = 'normal' | 'admin' | undefined;

export type MenuLink = [JSX.Element, string, string]; 

export interface MenuItemProps {
    icon: React.ReactNode;
    drawerOpen: boolean;
    route: string;
    text: string;
};

export interface SpaceSelectProps {
    positionRequired: PositionRequired;
    disableGetUser: boolean;
    drawerOpen: boolean;
};

export interface TopBarProps {
    handleDrawerToggle: () => void;
    drawerOpen: boolean;
    title: string;
};

export interface MenuDrawerProps {
    drawerOpen: boolean;
    children: ReactNode;
};
  
export interface LayoutProps {
    updateSpace?: (spaceId?: string) => void;
    positionRequired?: PositionRequired;
    loading?: boolean | string;
    disableGetUser?: boolean;
    children: ReactNode;
    title?: string;
};