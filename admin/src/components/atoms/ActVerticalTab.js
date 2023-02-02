import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

export default function VerticalTabs({ options, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();

  useEffect(() => {
    if (value) navigate(`${value}`);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="row max-height">
      <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: 'divider' }}>
        {options.map((item, index) => {
          return <Tab key={index} label={item.label} value={item.value} />;
        })}
      </Tabs>
    </div>
  );
}
