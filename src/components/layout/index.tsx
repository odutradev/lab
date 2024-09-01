import { Avatar, AppBar, Drawer, List, Divider, Typography, Toolbar, IconButton, Stack, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';

import { adminLinks, defaultLinks, settingsLinks } from './links';
import MenuItemComponent from './components/menuItem';
import SpaceSelect from './components/spaceSelect';
import useUserStore from '../../store/user';
import { LayoutProps } from './types';
import Loading from '../loading';

const Layout: React.FC<LayoutProps> = ({ children, title = "LAB", loading = false, disableGetUser = false, positionRequired }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const { user } = useUserStore(x => x);

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
        <Stack spacing={2} p={1} sx={{ flexGrow: 1 }}>
          <SpaceSelect handleSpaceChange={() => {}} drawerOpen={drawerOpen} disableGetUser={disableGetUser} positionRequired={positionRequired} />
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
          {user?.role === 'admin' && (
            <>
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
            </>
          )}
        </Stack>
        <Stack spacing={2} p={1} sx={{ marginTop: 'auto' }}>
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
