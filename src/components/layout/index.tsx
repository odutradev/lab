import React, { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { 
  Avatar, AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, 
  Divider, Typography, Toolbar, IconButton, Stack, Box, Select, 
  MenuItem, FormControl, InputLabel 
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { adminLinks, defaultLinks, settingsLinks } from './links'

import useUserStore from '../../store/user';
import Loading from '../loading';

interface DashboardLayoutProps {
  children: ReactNode;
  loading?: boolean | string;
  updateSpace: (spaceId?: string) => void;
}
import MenuItemComponent from './components/menuItem';
/*
interface Space {
  name: string;
  _id: string;
}
*/

const Layout: React.FC<DashboardLayoutProps> = ({ children, loading = false, updateSpace }) => {
  const [selectedSpace, setSelectedSpace] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  //const [spaces, setSpaces] = useState<Space[]>([]);
  const location = useLocation();

  const { user } = useUserStore(x => x);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSpaceChange = (event: string) => {
    setSelectedSpace(event);
    localStorage.setItem("space", event);
    updateSpace(event);
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
            <div style={{ padding: '16px' }}>
              {drawerOpen && (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="space-select-label">Tabela</InputLabel>
                  <Select
                    labelId="space-select-label"
                    value={selectedSpace}
                    onChange={(event) => handleSpaceChange(event.target.value as string)}
                    label="Tabela"
                  >
                    {[{ name: 'teste', _id: 'hkshdkhd' }].map((space) => (
                      <MenuItem key={space._id} value={space._id}>
                        {space.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
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
