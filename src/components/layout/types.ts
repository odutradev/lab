import { ReactNode } from "react";

import { IUserSpaceData } from "../../actions/user";

export type PositionRequired = 'normal' | 'admin' | undefined;

export type MenuLink = [JSX.Element, string, string]; 

export interface MenuItemProps {
    icon: React.ReactNode;
    drawerOpen: boolean;
    route: string;
    text: string;
};

export interface SpaceSelectProps {
    handleSpaceChange: (value: IUserSpaceData) => void;
    positionRequired: PositionRequired;
    disableGetUser: boolean;
    drawerOpen: boolean;
};
  
export interface LayoutProps {
    updateSpace?: (spaceId?: string) => void;
    positionRequired?: PositionRequired;
    loading?: boolean | string;
    disableGetUser?: boolean;
    children: ReactNode;
    title?: string;
};