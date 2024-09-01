import { AppBar, Toolbar, IconButton, Typography, Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import useUserStore from "../../../../store/user";
import { TopBarProps } from "../../types";

const TopBar: React.FC<TopBarProps> = ({ drawerOpen, handleDrawerToggle, title }) => {
    const { user } = useUserStore(x => x); 

    return (
        <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1, 
          width: `calc(100% - ${drawerOpen ? 240 : 60}px)`, 
          ml: `${drawerOpen ? 240 : 60}px`, 
          transition: 'width 0.3s, margin-left 0.3s' 
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {title}
          </Typography>
          <Avatar
            src={user?.images?.avatar || undefined}
            sx={{ width: 40, height: 40 }}
          >
            {!user?.images?.avatar && user?.name?.slice(0, 2).toUpperCase()}
          </Avatar>
        </Toolbar>
      </AppBar>
    );
};

export default TopBar;