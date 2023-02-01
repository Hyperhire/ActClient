import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function ActTabs({ initialValue, menus }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (value) navigate(`/${value}`);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={(e, v) => handleChange(e, v)} aria-label="menu-tabs">
        {menus.map((item, index) => {
          return <Tab key={index} value={item.value} label={item.label} />;
        })}
      </Tabs>
    </Box>
  );
}
