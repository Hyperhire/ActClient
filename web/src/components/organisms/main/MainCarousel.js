import React, { useState } from 'react';
import ActCarousel from 'components/atoms/ActCarousel';
import { useReactQuery } from 'hooks/useReactQuery';
import { api } from 'repository';

const MainCarousel = () => {
  const { isSuccess, data } = useReactQuery('main-banner-list', api.main.banner);
  const [bannerData, setBannerData] = useState(data);

  const onInitHandler = () => {
    setBannerData(data[0]);
  };

  const onChangeHandler = index => {
    setBannerData(data[index]);
  };

  return (
    <div className="main-carousel-wrapper">
      {isSuccess && (
        <>
          <div className="carousel">
            <ActCarousel
              items={data.map(item => {
                return item.imageUrl;
              })}
              autoPlay={false}
              initHandler={onInitHandler}
              changeHandler={onChangeHandler}
            />
            <div className="sub-image-wrapper">
              <div className="sub-image">
                <img src={bannerData?.subImage} alt="sub-image" />
              </div>
            </div>
          </div>
          <div className="main-carousel-divider">
            <div className="title">
              <div className="text">{bannerData?._id}</div>
            </div>
            <div className="description-content-wrapper">
              <div className="description">
                <div className="text">{bannerData?.clickUrl}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default MainCarousel;
