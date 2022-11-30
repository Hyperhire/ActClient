import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActFaq from 'components/organisms/ActFaq';
import { ReactComponent as ArrowRight } from 'styles/assets/icons/arrow_line_right_lg.svg';
const MainFaq = () => {
  const navigate = useNavigate();
  const faqs = [
    {
      title: 'ACT 기부는 무엇인가요?',
      description: 'ACT 기부는 무엇인가요?ACT 기부는 무엇인가요?ACT 기부는 무엇인가요?ACT 기부는 무엇인가요?ACT 기부는 무엇인가요?ACT 기부는 무엇인가요?ACT 기부는 무엇인가요?ACT 기부는 무엇인가요?',
    },
    {
      title: '정기 기부하고 해지도 가능한가요??',
      description:
        '정기 기부하고 해지도 가능한가요?정기 기부하고 해지도 가능한가요?정기 기부하고 해지도 가능한가요?정기 기부하고 해지도 가능한가요?정기 기부하고 해지도 가능한가요?정기 기부하고 해지도 가능한가요?정기 기부하고 해지도 가능한가요?',
    },
    {
      title: '기부 영수증 발급도 되나요?',
      description: '기부 영수증 발급도 되나요?기부 영수증 발급도 되나요?기부 영수증 발급도 되나요?기부 영수증 발급도 되나요?기부 영수증 발급도 되나요?기부 영수증 발급도 되나요?',
    },
  ];
  const onClickHandler = () => {
    navigate('faq');
  };
  return (
    <div className="main-faq-wrapper">
      <div className="main-faq-title-wrapper link" onClick={onClickHandler}>
        <div className="main-faq-title">FAQ</div>
        <ArrowRight />
      </div>
      <ActFaq faqs={faqs} bgColor="#fafafa" contentColor="#efefef" />
    </div>
  );
};
export default MainFaq;
