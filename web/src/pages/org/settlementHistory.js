import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ActButton from 'components/atoms/ActButton';
import SettlementItem from 'components/organisms/SettlementItem';
import ActTab from '../../components/atoms/ActTab';
import OrganizationNewsItem from '../../components/organisms/OrganizationNewsItem';
import { ORGANIZATION_NEWS_TYPE } from '../../constants/constant';
import DisclosureItem from '../../components/organisms/DisclosureItem';

const SettlementHistory = ({ setOption }) => {
  const [buttonName, setButtonName] = useState('전체선택');

  useEffect(() => {
    setOption({
      title: '정산내역',
      subtitle: '',
      description: '',
      back: true,
      menu: true,
    });
  }, [setOption, buttonName]);

  const list1 = [{ amount: 1_000 }, { amount: 2_000 }, { amount: 3_000 }, { amount: 4_000 }];
  const list2 = [{ amount: 10_000 }, { amount: 20_000 }, { amount: 30_000 }];
  let sum = 0;
  const parseData = [
    {
      index: 0,
      label: '정산내역',
      header: (
        <>
          <div className="row gap-8">
            <ActButton className="button-small-outline" handleOnClick={() => console.log('')} label={buttonName} />
            <ActButton className="button-small-outline" disabled={true} handleOnClick={() => console.log('')} label="삭제" />
          </div>
          <div className="row">
            <div>정산가능금액</div>
            <div>{list1.reduce((a, b) => a + b.amount, 0)}</div>
          </div>
        </>
      ),
      footer: (
        <div className="col">
          <div>정산금액이 500,000원 이상일때만 정산요청가능합니다.</div>
          <div className="row">
            <div>정산요청금액</div>
            <div>20,000</div>
          </div>
          <div className="row">
            <div>취소하기</div>
            <div>정산요청하기</div>
          </div>
        </div>
      ),
      list: list1.map((item, index) => {
        return (
          <div key={index}>
            <SettlementItem item={item} clickHandler={item => console.log('onClick', item)} />
            {index !== list1.length && <div className="divider" />}
          </div>
        );
      }),
    },
    {
      index: 1,
      label: '지급내역',
      header: (
        <>
          <div className="row gap-8">
            <ActButton className="button-small-outline" handleOnClick={() => console.log('')} label={buttonName} />
            <ActButton className="button-small-outline" disabled={true} handleOnClick={() => console.log('')} label="삭제" />
          </div>
          <div className="row">
            <div>지급대기</div>
            <div>560,000</div>
          </div>
        </>
      ),
      list: list2.map((item, index) => {
        return (
          <div key={index}>
            <SettlementItem item={item} clickHandler={item => console.log('onClick', item)} />
            {index !== list2.length && <div className="divider" />}
          </div>
        );
      }),
    },
  ];

  return (
    <div className="col">
      <div className="col">
        <ActTab data={parseData} />
      </div>
    </div>
  );
};
export default SettlementHistory;
