import React, { useState } from 'react';
import ActCarousel from 'components/atoms/ActCarousel';
import FirstImage from 'styles/assets/images/mainKeyVisual/img.png';
import Hand from 'styles/assets/images/hand.svg';

const MainCarousel = () => {
  const makeDummy = () => {
    let tmp = [];
    for (let i = 0; i < 3; i++) {
      tmp.push({ image: FirstImage, title: `ACT와 함께하는 행복한 기부서비스`, description: `지구촌 모든 어린이의 풍성한 삶을 위해 가장 작은 부분까지 투명하게 ${i}`, subImage: Hand });
    }
    return tmp;
  };
  const [data, setData] = useState(makeDummy()[0]);
  const onInitHandler = () => {
    setData(makeDummy()[0]);
  };

  const onChangeHandler = index => {
    setData(makeDummy()[index]);
  };

  return (
    <div className="main-carousel-wrapper">
      <div className="carousel">
        <ActCarousel
          items={makeDummy().map(item => {
            return item.image;
          })}
          autoPlay={false}
          initHandler={onInitHandler}
          changeHandler={onChangeHandler}
        />
        <div className="sub-image-wrapper">
          <div className="sub-image">
            <img src={data?.subImage} alt="sub-image" />
          </div>
        </div>
      </div>
      <div className="main-carousel-divider">
        <div className="title">
          <div className="text">{data?.title}</div>
        </div>
        <div className="description-content-wrapper">
          <div className="description">
            <div className="text">{data.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainCarousel;
