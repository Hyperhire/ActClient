import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ReactComponent as Logo } from 'assets/images/logos/cojam_logo.svg';
import { ReactComponent as Hamburger } from 'assets/images/icons/hamburger.svg';
import useResize from 'hooks/useResize';
import Back from 'components/atoms/Back';

const Nav = ({ option = { title: '', back: false, hideMenu: false } }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log('option', option);
  const rootRef = useRef();
  const { width, height } = useResize(rootRef);

  const PAGES = [
    { url: '/login', name: 'Login' },
    { url: '/organization', name: '단체찾기' },
    { url: '/disclosure', name: '공시보기' },
    { url: '/faq', name: 'FAQ' },
  ];

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {PAGES.map((page, index) => (
          <ListItem key={`page.name${index}`} disablePadding>
            <ListItemButton>
              <Link to={page.url} className="title grey font-24 font-weight-700">
                {page.name}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <div ref={rootRef} className="max-width ">
      <header className="nav-wrapper row align-center padding-row-8 flex-auto ">
        <div className="nav max-width flex-auto header-zindex">
          <div className="nav-inside row align-center justify-between ">
            <div className="flex-1">{option.back ? <Back size="1rem" /> : <Logo onClick={() => navigate('/')} height={46} className="link" />}</div>
            <div className="flex-1">{option.title ? <div className="row max-width align-center justify-center">{option.title}</div> : null}</div>
            <div className="flex-1 row max-width align-center justify-end">
              {option.hideMenu ? null : (
                <div>
                  <button className="hamburger link" onClick={toggleDrawer(true)}>
                    <Hamburger />
                  </button>
                  <SwipeableDrawer anchor="right" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
                    {list()}
                  </SwipeableDrawer>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div>{option.title}</div>
    </div>
  );
};

export default Nav;
