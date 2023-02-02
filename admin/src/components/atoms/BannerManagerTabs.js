import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BannerControl from '../organisms/BannerControl';

export default function BannerManagerTabs({ data, onFinish }) {
  const [value, setValue] = useState(data[0]._id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="banner-tabs">
            {data.map((banner, index) => {
              return <Tab key={index} label={`메인배너${banner.sequence}`} value={banner._id} />;
            })}
          </TabList>
        </Box>
        {data.map((banner, index) => {
          return (
            <TabPanel key={index} value={banner._id}>
              <BannerControl data={banner} onFinish={() => onFinish()} />
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
}
