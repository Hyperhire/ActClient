import React from 'react';
import { useNavigate } from 'react-router-dom';
import DisclosureItem from 'components/organisms/DisclosureItem';
import { ReactComponent as ArrowRight } from 'styles/assets/icons/arrow_line_right_lg.svg';
import { ORGANIZATION_NEWS_TYPE } from '../../../constants/constant';
import { useReactQuery } from '../../../hooks/useReactQuery';
import { api } from '../../../repository';

const MainDisclosure = () => {
  const { isSuccess, data } = useReactQuery('main-notice-list', api.notice.list);
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/news/list', { state: { type: ORGANIZATION_NEWS_TYPE.DISCLOSURE } });
  };

  const onClickItemHandler = (type, item) => {
    navigate(`/news/${item._id}`, { state: { type } });
  };

  return (
    <div className="main-disclosure-wrapper">
      <div className="main-disclosure-title-wrapper link" onClick={onClickHandler}>
        <div className="main-disclosure-title">단체 최신 공지</div>
        <ArrowRight />
      </div>
      {isSuccess &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <DisclosureItem item={item} clickHandler={item => onClickItemHandler(ORGANIZATION_NEWS_TYPE.DISCLOSURE, item)} />
              <div className="divider" />
            </div>
          );
        })}
    </div>
  );
};
export default MainDisclosure;
