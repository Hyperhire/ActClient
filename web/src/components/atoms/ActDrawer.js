import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

const ActDrawer = ({ drawerState }) => {
  const [state, setState] = drawerState;

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, anchor: anchor, open: open });
  };

  const list = anchor => (
    <Box
      sx={{ borderRadius: 8, width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(state.anchor, false)}
      onKeyDown={toggleDrawer(state.anchor, false)}
    >
      <List>
        {state.items?.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>{item}</ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        PaperProps={{ sx: { borderRadius: state.anchor === 'bottom' ? '16px 16px 0 0' : state.anchor === 'top' ? '0 0 16px 16px' : '0 0 0 0' } }}
        anchor={state.anchor}
        open={state.open}
        onClose={toggleDrawer(state.anchor, false)}
      >
        {list(state.anchor)}
      </Drawer>
    </div>
  );
};

export default ActDrawer;
