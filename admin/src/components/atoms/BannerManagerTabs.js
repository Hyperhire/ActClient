import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BannerControl from '../organisms/BannerControl';

export default function BannerManagerTabs({ menus }) {
  const [value, setValue] = React.useState(menus[0].value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="banner-tabs">
            {menus.map((menu, index) => {
              return <Tab key={index} label={menu.label} value={menu.value} />;
            })}
          </TabList>
        </Box>
        <TabPanel value="banner1">
          <BannerControl value="banner1" />
        </TabPanel>
        <TabPanel value="banner2">
          <BannerControl value="banner2" />
        </TabPanel>
        <TabPanel value="banner3">
          <BannerControl value="banner3" />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
