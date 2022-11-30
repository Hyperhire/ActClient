import React, { useEffect, useCallback } from 'react';
import Carousel from 'react-material-ui-carousel';
import CircleIcon from '@mui/icons-material/Circle';

const Item = props => {
  const { item } = props;
  const { image } = item;
  return (
    <div className="act-carousel-image">
      <img src={image} alt="main-image" />
    </div>
  );
};

const ActCarousel = props => {
  const { items, autoPlay, animation = 'slide', setParentData } = props;

  return (
    <Carousel
      sx={{ width: '100%', height: '100%' }}
      navButtonsAlwaysInvisible
      onChange={(now, previous) => setParentData(items[now])}
      changeOnFirstRender={() => setParentData(items[0])}
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
          textAlign: 'right',
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};
export default ActCarousel;
