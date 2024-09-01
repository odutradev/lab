import { Drawer } from "@mui/material";

import { MenuDrawerProps } from "../../types";

const MenuDrawer: React.FC<MenuDrawerProps> = ({ children, drawerOpen }) => {
    return (
        <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 60,
          flexShrink: 0,
          height: '100vh',
          '& .MuiDrawer-paper': {
            width: drawerOpen ? 240 : 60,
            height: '100%',
            transition: 'width 0.3s',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
          },
        }}
      >
        {children}
      </Drawer>
    );
};

export default MenuDrawer;