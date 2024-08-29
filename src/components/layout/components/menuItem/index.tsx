import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import { MenuItemProps } from '../../types';

const MenuItem: React.FC<MenuItemProps> = ({ text, route, icon, drawerOpen }) => {
  const location = useLocation();
  const theme = useTheme();
  const isSelected = location.pathname === route;

  return (
    <ListItemButton
      component={Link}
      to={route}
      selected={isSelected}
      sx={{
        justifyContent: drawerOpen ? 'initial' : 'center',
        px: 2.5,
        backgroundColor: isSelected ? theme.palette.action.selected : 'inherit',
        '&.Mui-selected:hover': {
          backgroundColor: theme.palette.action.selected,
        },
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: drawerOpen ? 3 : 'auto',
          justifyContent: 'center',
          color: theme.palette.text.primary,
        }}
      >
        {icon}
      </ListItemIcon>
      {drawerOpen && (
        <ListItemText
          primary={text}
          sx={{ color: theme.palette.text.primary }}
        />
      )}
    </ListItemButton>
  );
};

export default MenuItem;