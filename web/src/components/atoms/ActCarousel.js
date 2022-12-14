import React, { useEffect, useCallback } from 'react';
import Carousel from 'react-material-ui-carousel';
import CircleIcon from '@mui/icons-material/Circle';

const ActCarousel = props => {
  const { items, autoPlay, animation = 'slide', initHandler, changeHandler, dotAnchor = 'right', type = 'normal' } = props;
  return (
    <Carousel
      sx={{ width: '100%', height: '100%' }}
      navButtonsAlwaysInvisible
      onChange={now => changeHandler && changeHandler(now)}
      changeOnFirstRender={() => initHandler && initHandler}
      autoPlay={autoPlay}
      animation={animation}
      timeout={{ appear: 0, enter: 500, exit: 500 }}
      IndicatorIcon={<CircleIcon fontSize="8" />}
      indicatorIconButtonProps={{
        style: {
          padding: 4,
          color: 'rgba(0,0,0,0.15)',
          fontSize: 8,
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: 'black',
          fontSize: 8,
        },
      }}
      indicatorContainerProps={{
        style: {
          textAlign: dotAnchor,
        },
      }}
    >
      {items?.map((item, i) => {
        return (
          <div key={i} className={`${type === 'main' ? 'act-carousel-main-image' : 'act-carousel-image'}`}>
            <img src={item} alt="main-image" />
          </div>
        );
      })}
    </Carousel>
  );
};
export default ActCarousel;
