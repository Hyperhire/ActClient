import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

const ActDrawer = ({ drawerState }) => {
  const [state, setState] = drawerState;

  const renderItem = anchor => (
    <Box sx={{ borderRadius: 8, width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
      {state.item}
    </Box>
  );

  return (
    <div>
      <Drawer
        PaperProps={{ sx: { borderRadius: state.anchor === 'bottom' ? '16px 16px 0 0' : state.anchor === 'top' ? '0 0 16px 16px' : '0 0 0 0' } }}
        anchor={state.anchor}
        open={state.open}
        onClose={() => {}}
      >
        {renderItem(state.anchor)}
      </Drawer>
    </div>
  );
};

export default ActDrawer;
