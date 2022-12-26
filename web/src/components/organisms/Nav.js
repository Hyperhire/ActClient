import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { ReactComponent as Logo } from 'styles/assets/icons/logo/act.svg';
import { ReactComponent as Hamburger } from 'styles/assets/images/icons/hamburger.svg';

import Back from 'components/atoms/Back';

import NavDrawer from './NavDrawer';

const Nav = ({ option = { title: 'title', subtitle: 'subtitle', description: 'description', back: false, menu: true } }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const onLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="max-width padding-row-24">
      <header className="nav-wrapper row align-center flex-auto">
        <div className="nav max-width flex-auto">
          <div className="nav-inside row align-center justify-between">
            <div className="flex-1 link" onClick={onLogoClick}>
              {option.back ? <Back size="1rem" /> : <Logo width="58" height="28" />}
            </div>
            <div className="flex-2">{option.title ? <div className="row max-width align-center justify-center">{option.title}</div> : null}</div>
            <div className="flex-1 row max-width align-center justify-end">
              {option.menu ? (
                <div className="row max-width align-center justify-end">
                  <button className="hamburger link" onClick={toggleDrawer(true)}>
                    <Hamburger />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>
      {option.subtitle && (
        <div className="subtitle-wrapper col gap-16">
          <div className="subtitle bold max-width pre-wrap">
            {option.subtitle}
            {option.chip && <span className="align-center">{option.chip}</span>}
            {option.button && <div className="subtitle-optional-button">{option.button}</div>}
          </div>
          {option.description && <div className="description">{option.description}</div>}
        </div>
      )}
      {option.date && <div className="subtitle-date">{dayjs(new Date()).locale('ko').format('YYYY.MM.DD a h:mm')}</div>}

      <SwipeableDrawer
        PaperProps={{
          sx: { width: '80%' },
        }}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <NavDrawer setOpen={setOpen} />
      </SwipeableDrawer>
    </div>
  );
};

export default Nav;
