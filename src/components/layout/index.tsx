import { Avatar, AppBar, Drawer, List, Divider, Typography, Toolbar, IconButton, Stack, Box } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

import { adminLinks, defaultLinks, settingsLinks } from './links'
import MenuItemComponent from './components/menuItem';
import SpaceSelect from './components/spaceSelect';
import useUserStore from '../../store/user';
import { LayoutProps } from './types';
import Loading from '../loading';

const Layout: React.FC<LayoutProps> = ({ children, loading = false }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const { user  } = useUserStore(x => x);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
            LAB
          </Typography>
          <Avatar>{user?.name?.slice(0, 2) || ""}</Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? 240 : 60,
            transition: 'width 0.3s',
            boxSizing: 'border-box',
          },
        }}
      >
        <Stack spacing={2} p={1}>
          <div>
            <SpaceSelect handleSpaceChange={() => {}} drawerOpen={drawerOpen}/>
            <Divider />
            <List>
              {defaultLinks.map(([icon, text, route]) => (
                <MenuItemComponent
                  drawerOpen={drawerOpen}
                  route={route}
                  icon={icon} 
                  text={text}
                  key={route}
                />
              ))}
            </List>
          </div>
          {user?.role === 'admin' && (
            <div>
              <Divider />
              <List>
                {adminLinks.map(([icon, text, route]) => (
                  <MenuItemComponent
                    drawerOpen={drawerOpen}
                    route={route}
                    icon={icon} 
                    text={text}
                    key={route}
                  />
                ))}
              </List>
            </div>
          )}
          <div>
            <Divider />
            <List>
              {settingsLinks.map(([icon, text, route]) => (
                <MenuItemComponent
                  drawerOpen={drawerOpen}
                  route={route}
                  icon={icon} 
                  text={text}
                  key={route}
                />
              ))}
            </List>
          </div>
        </Stack>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, transition: 'margin-left 0.3s' }}>
        <Toolbar />
        {loading ? <Loading showSpinner message={loading as string} /> : children}  
      </Box>
    </Box>
  );
}

export default Layout;
