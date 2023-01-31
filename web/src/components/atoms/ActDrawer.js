import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

const ActDrawer = ({ drawerInfo }) => {
  const renderItem = anchor => (
    <Box sx={{ borderRadius: 8, width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
      {drawerInfo.item}
    </Box>
  );

  return (
    <React.Fragment key={drawerInfo.anchor}>
      <Drawer
        PaperProps={{ sx: { borderRadius: drawerInfo.anchor === 'bottom' ? '16px 16px 0 0' : drawerInfo.anchor === 'top' ? '0 0 16px 16px' : '0 0 0 0' } }}
        anchor={drawerInfo.anchor}
        open={drawerInfo.open}
        onClose={drawerInfo.close}
      >
        {renderItem(drawerInfo.anchor)}
      </Drawer>
    </React.Fragment>
  );
};

export default ActDrawer;
