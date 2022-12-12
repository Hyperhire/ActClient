import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

const TabPanel = props => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`act-tab-panel-${index}`} aria-labelledby={`act-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
};

const onClickHandler = index => {
  return {
    id: `act-tab-${index}`,
    'aria-controls': `act-tab-panel-${index}`,
  };
};

const ActTab = ({ data }) => {
  const [value, setValue] = useState(false);

  // mui bug 때문에 warning clear 하려고 추가 함
  useEffect(() => {
    setTimeout(() => {
      setValue(0);
    }, 100);
  }, []);

  const handleChange = newValue => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          TabIndicatorProps={{ sx: { backgroundColor: 'black' } }}
          value={value}
          onChange={(e, v) => {
            handleChange(v);
          }}
        >
          {data.map(item => {
            return (
              <Tab sx={{ flex: 1 }} key={item.index} label={<span className={`"title-medium" ${item.index === value ? 'black' : 'placeholder'}`}>{item.label}</span>} {...onClickHandler(item.index)} />
            );
          })}
        </Tabs>
      </Box>
      {data.map(item => {
        return (
          <TabPanel key={item.index} value={value} index={item.index}>
            {item.list}
          </TabPanel>
        );
      })}
    </Box>
  );
};
export default ActTab;
