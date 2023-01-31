import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function ActTabs({ initialValue }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (value) navigate(`/${value}`);
  }, [value]);

  const MENU = [
    { label: '회원관리', value: 'member/individual' },
    { label: '단체관리', value: 'organization/notice' },
    { label: '결제/정산', value: 'payment' },
    { label: '후원관리', value: 'donation' },
    { label: '운영관리', value: 'operation' },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={(e, v) => handleChange(e, v)} aria-label="menu-tabs">
        {MENU.map((item, index) => {
          return <Tab key={index} value={item.value} label={item.label} />;
        })}
      </Tabs>
    </Box>
  );
}
