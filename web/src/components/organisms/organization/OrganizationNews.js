import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, USER_INFO } from 'utils/sessionStorage';
import DonationListItem from 'components/organisms/DonationListItem';
import ActTab from 'components/atoms/ActTab';
import { ORGANIZATION_NEWS_TYPE } from 'constants/constant';
import OrganizationNewsItem from '../OrganizationNewsItem';
import OrganizationNewsImage1 from 'styles/assets/images/news/img.png';
import OrganizationNewsImage2 from 'styles/assets/images/news/img_1.png';
import OrganizationNewsImage3 from 'styles/assets/images/news/img_2.png';
import OrganizationNewsImage4 from 'styles/assets/images/news/img_3.png';
import OrganizationNewsImage5 from 'styles/assets/images/news/img_4.png';
import DisclosureItem from '../DisclosureItem';

const OrganizationNews = () => {
  const navigate = useNavigate();

  const dummy = [
    {
      id: 0,
      image: OrganizationNewsImage1,
      title: '나눔은 동행이에요. 후원 30주년 최연소 후원자 인터뷰',
      description:
        '어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이',
    },
    {
      id: 1,
      image: OrganizationNewsImage2,
      title: '나눔은 동행이에요. 후원 30주년 최연소 후원자 인터뷰',
      description:
        '어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이',
    },
    {
      id: 2,
      image: OrganizationNewsImage3,
      title: '나눔은 동행이에요. 후원 30주년 최연소 후원자 인터뷰',
      description:
        '어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이',
    },
    {
      id: 3,
      image: OrganizationNewsImage4,
      title: '나눔은 동행이에요. 후원 30주년 최연소 후원자 인터뷰',
      description:
        '어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이',
    },
    {
      id: 4,
      image: OrganizationNewsImage5,
      title: '나눔은 동행이에요. 후원 30주년 최연소 후원자 인터뷰',
      description:
        '어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이 어려운 환경에서도 어머니의 마음을 이',
    },
  ];

  const dummyDisclosure = [
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
  ];

  const makeDummy = type => {
    let tmp = [];
    for (let i = 0; i < 20; i++) {
      tmp.push(
        type === ORGANIZATION_NEWS_TYPE.NEWS
          ? {
              id: i,
              image: `image ${i}`,
              title: `title ${i}`,
              description: `description ${i}`,
            }
          : {
              id: i,
              image: `image ${i}`,
              title: `title ${i}`,
              description: `description ${i}`,
            },
      );
    }
    return tmp;
  };

  const data = [
    {
      index: 0,
      label: '단체 소식',
      list: dummy.map((item, index) => {
        return (
          <>
            <OrganizationNewsItem type={ORGANIZATION_NEWS_TYPE.NEWS} key={index} item={item} />
            {index !== dummy.length && <div className="divider" />}
          </>
        );
      }),
    },
    {
      index: 1,
      label: '단체 공시',
      list: dummyDisclosure.map((item, index) => {
        return (
          <>
            <DisclosureItem key={index} item={item} />
            {index !== dummyDisclosure.length && <div className="divider" />}
          </>
        );
      }),
    },
  ];

  return (
    <div className="col">
      <ActTab data={data} />
    </div>
  );
};
export default OrganizationNews;
