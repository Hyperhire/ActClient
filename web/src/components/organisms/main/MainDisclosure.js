import React from 'react';
import { useNavigate } from 'react-router-dom';
import DisclosureItem from 'components/organisms/DisclosureItem';
import { ReactComponent as ArrowRight } from 'styles/assets/icons/arrow_line_right_lg.svg';

const MainDisclosure = () => {
  const navigate = useNavigate();
  const dummy = [
    {
      title: '홑트아동복지회',
      description: '기부금품모집완료 및 사용내역 보고',
      date: '20221224',
    },
    {
      title: '월드비전',
      description: '기부금품모집완료 및 사용내역 보고',
      date: '20221224',
    },
    {
      title: '굿네이버스',
      description: '기부금품모집완료 및 사용내역 보고',
      date: '20221224',
    },
  ];
  const makeDummy = () => {
    let tmp = [];
    for (let i = 0; i < 20; i++) {
      tmp.push({
        title: `title ${i}`,
        description: `description ${i}`,
        date: `date ${i}`,
      });
    }
    return tmp;
  };
  const onClickHandler = () => {
    navigate('disclosure');
  };
  return (
    <div className="main-disclosure-wrapper">
      <div className="main-disclosure-title-wrapper link" onClick={onClickHandler}>
        <div className="main-disclosure-title">단체 최신 공지</div>
        <ArrowRight />
      </div>
      {dummy.map((item, index) => {
        return (
          <div key={index}>
            <DisclosureItem item={item} />
            <div className="divider" />
          </div>
        );
      })}
    </div>
  );
};
export default MainDisclosure;
