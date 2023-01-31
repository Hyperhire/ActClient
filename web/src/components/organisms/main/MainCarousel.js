import React, { useState } from 'react';
import ActCarousel from 'components/atoms/ActCarousel';
import { useReactQuery } from 'hooks/useReactQuery';
import { api } from 'repository';
import Hand from 'styles/assets/images/hand.svg';

const MainCarousel = () => {
  const { isSuccess, data } = useReactQuery('main-banner-list', api.main.banner);
  const [bannerData, setBannerData] = useState({ title: `ACT와 함께하는 행복한 기부서비스`, description: `지구촌 모든 어린이의 풍성한 삶을 위해 가장 작은 부분까지 투명하게`, subImage: Hand });

  // const onInitHandler = () => {
  //   setBannerData(data[0]);
  // };
  //
  // const onChangeHandler = index => {
  //   setBannerData(data[index]);
  // };

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
              type="main"
              // initHandler={onInitHandler}
              // changeHandler={onChangeHandler}
            />
            <div className="sub-image-wrapper">
              <div className="sub-image">
                <img src={bannerData.subImage} alt="sub-image" />
              </div>
            </div>
          </div>
          <div className="main-carousel-divider">
            <div className="title">
              <div className="text">{bannerData.title}</div>
            </div>
            <div className="description-content-wrapper">
              <div className="description">
                <div className="text">{bannerData.description}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default MainCarousel;
