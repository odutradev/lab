import React, { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { 
  Avatar, AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, 
  Divider, Typography, Toolbar, IconButton, Stack, Box, Select, 
  MenuItem, FormControl, InputLabel 
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddToPhotos from '@mui/icons-material/AddToPhotos';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalOffer from '@mui/icons-material/LocalOffer';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';

import useUserStore from '../../store/user';
import Loading from '../loading';

interface DashboardLayoutProps {
  children: ReactNode;
  loading?: boolean | string;
  updateSpace: (spaceId?: string) => void;
}

interface Space {
  name: string;
  _id: string;
}

const Layout: React.FC<DashboardLayoutProps> = ({ children, loading = false, updateSpace }) => {
  const [selectedSpace, setSelectedSpace] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [spaces, setSpaces] = useState<Space[]>([]);
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

  const defaultLinks: [JSX.Element, string, string][] = [
    [<HomeIcon />, 'Visão Geral', '/dashboard'],
    [<AddToPhotos />, 'Tabelas', '/dashboard/spaces'],
    [<LocalOffer />, 'Procedimentos', '/dashboard/services'],
  ];

  const settingsLinks: [JSX.Element, string, string][] = [
    [<AccountCircleIcon />, 'Minha conta', '/dashboard/profile'],
    [<LogoutIcon />, 'Sair', '/logout'],
  ];

  const adminLinks: [JSX.Element, string, string][] = [
    [<PersonSearchIcon />, 'Usuários', '/dashboard/admin/users'],
  ];

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
                <ListItem  
                  key={text} 
                  component={Link} 
                  to={route} 
                  selected={location.pathname === route} 
                  sx={{ 
                    justifyContent: drawerOpen ? 'initial' : 'center', 
                    px: 2.5,
                    '&.Mui-selected': {
                      backgroundColor: theme => theme.palette.action.selected,
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: theme => theme.palette.action.selected,
                    },
                    '&:hover': {
                      backgroundColor: theme => theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 0, 
                      mr: drawerOpen ? 3 : 'auto', 
                      justifyContent: 'center', 
                      color: theme => theme.palette.text.primary,
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {drawerOpen && <ListItemText primary={text} sx={{ color: theme => theme.palette.text.primary }} />}
                </ListItem>
              ))}
            </List>
          </div>
          {user?.role === 'admin' && (
            <div>
              <Divider />
              <List>
                {adminLinks.map(([icon, text, route]) => (
                  <ListItem  
                    key={text} 
                    component={Link} 
                    to={route} 
                    selected={location.pathname === route} 
                    sx={{ 
                      justifyContent: drawerOpen ? 'initial' : 'center', 
                      px: 2.5,
                      '&.Mui-selected': {
                        backgroundColor: theme => theme.palette.action.selected,
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: theme => theme.palette.action.selected,
                      },
                      '&:hover': {
                        backgroundColor: theme => theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        minWidth: 0, 
                        mr: drawerOpen ? 3 : 'auto', 
                        justifyContent: 'center', 
                        color: theme => theme.palette.text.primary,
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    {drawerOpen && <ListItemText primary={text} sx={{ color: theme => theme.palette.text.primary }} />}
                  </ListItem>
                ))}
              </List>
            </div>
          )}
          <div>
            <Divider />
            <List>
              {settingsLinks.map(([icon, text, route]) => (
                <ListItem  
                  key={text} 
                  component={Link} 
                  to={route} 
                  selected={location.pathname === route} 
                  sx={{ 
                    justifyContent: drawerOpen ? 'initial' : 'center', 
                    px: 2.5,
                    '&.Mui-selected': {
                      backgroundColor: theme => theme.palette.action.selected,
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: theme => theme.palette.action.selected,
                    },
                    '&:hover': {
                      backgroundColor: theme => theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 0, 
                      mr: drawerOpen ? 3 : 'auto', 
                      justifyContent: 'center', 
                      color: theme => theme.palette.text.primary,
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {drawerOpen && <ListItemText primary={text} sx={{ color: theme => theme.palette.text.primary }}/>}
                </ListItem>
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
