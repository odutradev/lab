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
};
  