import React, { useContext, useEffect, useState } from 'react';
import ActFaq from 'components/organisms/ActFaq';

const Faq = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '', subtitle: 'FAQ', description: '', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);
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

  return (
    <div>
      <ActFaq faqs={faqs} bgColor="#ffffff" contentColor="#efefef" />
    </div>
  );
};

export default Faq;
