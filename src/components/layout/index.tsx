import { List, Divider, Toolbar, Stack, Box, Accordion, AccordionSummary, AccordionDetails, Typography, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

import { adminLinks, defaultLinks, settingsLinks } from './links';
import MenuItemComponent from './components/menuItem';
import SpaceSelect from './components/spaceSelect';
import MenuDrawer from './components/menuDrawer';
import useUserStore from '../../store/user';
import useMenuStore from '../../store/menu';
import TopBar from './components/topBar';
import { LayoutProps } from './types';
import Loading from '../loading';

const Layout: React.FC<LayoutProps> = ({ children, title = "LAB", loading = false, disableGetUser = false, positionRequired }) => {
  const { menu, updateDrawerOpen, updatePasteOpen } = useMenuStore(x => x);
  const { user } = useUserStore(x => x);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    updateDrawerOpen(!menu.drawerOpen);
  };

  const handleAccordionToggle = (type: 'default' | 'admin') => {
    updatePasteOpen(type, !menu.pastes[type].open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar title={title} handleDrawerToggle={handleDrawerToggle} drawerOpen={menu.drawerOpen}/>
      <MenuDrawer drawerOpen={menu.drawerOpen}>
        <Stack spacing={2} p={1} sx={{ flexGrow: 1 }}>
          <SpaceSelect drawerOpen={menu.drawerOpen} disableGetUser={disableGetUser} positionRequired={positionRequired} />
          <Divider />

          <Accordion
            expanded={menu.pastes.default.open}
            onChange={() => handleAccordionToggle('default')}
            defaultExpanded={!isMobile}
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: 'none',
              backgroundImage: 'none',
              '&::before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: 'transparent',
                padding: isMobile ? '8px' : '10px',
                minHeight: 'unset',
                border: 'none',
                backgroundImage: 'none',
                '&.Mui-expanded': { minHeight: 'unset' },
                '& > .MuiAccordionSummary-content': { margin: 0 },
                '& .MuiTypography-root': { display: menu.drawerOpen ? 'block' : 'none' } 
              }}
            >
              <Typography>GERAL</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: isMobile ? '8px 0' : 0 }}>
              <List>
                {defaultLinks.map(([icon, text, route]) => (
                  <Tooltip 
                    title={menu.drawerOpen ? '' : text} 
                    placement="right"
                    arrow
                    key={route}
                  >
                    <span>
                      <MenuItemComponent
                        drawerOpen={menu.drawerOpen}
                        route={route}
                        icon={icon} 
                        text={text}
                      />
                    </span>
                  </Tooltip>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Divider />
          {user?.role === 'admin' && (
            <Accordion
              expanded={menu.pastes.admin.open}
              onChange={() => handleAccordionToggle('admin')}
              sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                backgroundImage: 'none',
                '&::before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: 'transparent',
                  padding: isMobile ? '8px' : '10px',
                  minHeight: 'unset',
                  border: 'none',
                  backgroundImage: 'none',
                  '&.Mui-expanded': { minHeight: 'unset' },
                  '& > .MuiAccordionSummary-content': { margin: 0 },
                  '& .MuiTypography-root': { display: menu.drawerOpen ? 'block' : 'none' } 
                }}
              >
                <Typography>ADMINISTRADOR</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: isMobile ? '8px 0' : 0 }}>
                <List>
                  {adminLinks.map(([icon, text, route]) => (
                    <Tooltip 
                      title={menu.drawerOpen ? '' : text} 
                      placement="right"
                      arrow
                      key={route}
                    >
                      <span>
                        <MenuItemComponent
                          drawerOpen={menu.drawerOpen}
                          route={route}
                          icon={icon} 
                          text={text}
                        />
                      </span>
                    </Tooltip>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}
        </Stack>
        <Stack spacing={2} p={1} sx={{ marginTop: 'auto' }}>
          <Divider />
          <List>
            {settingsLinks.map(([icon, text, route]) => (
              <Tooltip 
                title={menu.drawerOpen ? '' : text}
                placement="right"
                arrow
                key={route}
              >
                <span>
                  <MenuItemComponent
                    drawerOpen={menu.drawerOpen}
                    route={route}
                    icon={icon} 
                    text={text}
                  />
                </span>
              </Tooltip>
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