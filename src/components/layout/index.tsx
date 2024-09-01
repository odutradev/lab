import { List, Divider, Toolbar, Stack, Box } from '@mui/material';
import React, { useState } from 'react';

import { adminLinks, defaultLinks, settingsLinks } from './links';
import MenuItemComponent from './components/menuItem';
import SpaceSelect from './components/spaceSelect';
import MenuDrawer from './components/menuDrawer';
import useUserStore from '../../store/user';
import TopBar from './components/topBar';
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
      <TopBar title={title} handleDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen}/>
      <MenuDrawer drawerOpen={drawerOpen}>
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
      </MenuDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, transition: 'margin-left 0.3s' }}>
        <Toolbar />
        {loading ? <Loading showSpinner message={loading as string} /> : children}  
      </Box>
    </Box>
  );
}

export default Layout;
