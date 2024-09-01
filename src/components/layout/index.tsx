import { List, Divider, Toolbar, Stack, Box, Accordion, AccordionSummary, AccordionDetails, Typography, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

          <Accordion
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
                '& .MuiTypography-root': { display: drawerOpen ? 'block' : 'none' } 
              }}
            >
              <Typography>GERAL</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: isMobile ? '8px 0' : 0 }}>
              <List>
                {defaultLinks.map(([icon, text, route]) => (
                  <Tooltip 
                    title={drawerOpen ? '' : text} 
                    arrow
                    key={route}
                  >
                    <span>
                      <MenuItemComponent
                        drawerOpen={drawerOpen}
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
                  '& .MuiTypography-root': { display: drawerOpen ? 'block' : 'none' } 
                }}
              >
                <Typography>ADMINISTRADOR</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: isMobile ? '8px 0' : 0 }}>
                <List>
                  {adminLinks.map(([icon, text, route]) => (
                    <Tooltip 
                      title={drawerOpen ? '' : text} 
                      arrow
                      key={route}
                    >
                      <span>
                        <MenuItemComponent
                          drawerOpen={drawerOpen}
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
                title={drawerOpen ? '' : text}
                arrow
                key={route}
              >
                <span>
                  <MenuItemComponent
                    drawerOpen={drawerOpen}
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
