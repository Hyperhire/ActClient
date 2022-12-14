import React, { useContext, useEffect, useState } from 'react';
import ActFaq from 'components/organisms/ActFaq';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import ActSearchBar from '../../components/atoms/ActSearchBar';
import { SEARCH_TYPE } from '../../constants/constant';

const Faq = ({ setOption }) => {
  const { isSuccess, data } = useReactQuery(`faq-list`, api.faq.list);

  useEffect(() => {
    setOption({ title: '', subtitle: 'FAQ', description: '', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);

  const onSearchResultData = data => {
    console.log('onSearchResultData');
  };

  return (
    <div className="col max-width">
      <div className="search-bar-wrapper">
        <ActSearchBar type={SEARCH_TYPE.FAQ} searchResultData={onSearchResultData} />
      </div>
      <div className="left-24 divider-thick-primary-2" />
      {isSuccess && <ActFaq faqs={data} bgColor="#ffffff" contentColor="#efefef" />}
    </div>
  );
};

export default Faq;
