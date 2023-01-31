import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ActTable from 'components/atoms/ActTable';
import { PAYMENT_MENU_TYPE } from 'constants/constant';
import ActPaymentFilter from 'components/organisms/ActPaymentFilter';
import ActSettlementFilter from 'components/organisms/ActSettlementFilter';

const PaymentList = () => {
  const con = useOutletContext();
  console.log('PaymentList', con);
  const [filter, setFilter] = useState();

  useEffect(() => {
    console.log('filter', filter);
  }, [filter]);
  const paymentDummy = () => {
    let index = 0;
    const data = { rows: [], headers: [] };
    while (index < 472) {
      index++;
      data.rows.push({
        index: index,
        paymentDate: `paymentDate ${index}`,
        name: `name ${index}`,
        id: `id ${index}`,
        orgName: `orgName ${index}`,
        donationId: `donationId ${index}`,
        paymentType: `paymentType ${index}`,
        donationType: `donationType ${index}`,
        paymentStatus: `paymentStatus ${index}`,
        amount: `amount ${index}`,
      });
    }
    data.headers = [
      {
        id: 'index',
        numeric: false,
        disablePadding: true,
        label: 'NO',
      },
      {
        id: 'paymentDate',
        numeric: false,
        disablePadding: true,
        label: '결제일시',
      },
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: '후원자 실명',
      },
      {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: '후원자 ID',
      },
      {
        id: 'orgName',
        numeric: false,
        disablePadding: true,
        label: '단체명',
      },
      {
        id: 'donationId',
        numeric: false,
        disablePadding: true,
        label: '후원 ID',
      },
      {
        id: 'paymentType',
        numeric: false,
        disablePadding: true,
        label: '결제유형',
      },
      {
        id: 'donationType',
        numeric: false,
        disablePadding: true,
        label: '후원형태',
      },
      {
        id: 'paymentStatus',
        numeric: false,
        disablePadding: true,
        label: '결제상태',
      },
      {
        id: 'amount',
        numeric: false,
        disablePadding: true,
        label: '결제금액',
      },
    ];
    return data;
  };

  const settlementDummy = () => {
    let index = 0;
    const data = { rows: [], headers: [] };
    while (index < 51) {
      index++;
      data.rows.push({
        index: index,
        settlementDate: `settlement ${index}`,
        orgId: `orgId ${index}`,
        orgName: `orgName ${index}`,
        settlementAmount: `settlementAmount ${index}`,
        settlementStatus: `settlementStatus ${index}`,
      });
    }
    data.headers = [
      {
        id: 'index',
        numeric: false,
        disablePadding: true,
        label: 'NO',
      },
      {
        id: 'paymentDate',
        numeric: false,
        disablePadding: true,
        label: '결제일시',
      },
      {
        id: 'orgId',
        numeric: false,
        disablePadding: true,
        label: '단체 ID',
      },
      {
        id: 'orgName',
        numeric: false,
        disablePadding: true,
        label: '단체명',
      },
      {
        id: 'settlementAmount',
        numeric: false,
        disablePadding: true,
        label: '정산요청금액',
      },
      {
        id: 'settlementStatus',
        numeric: false,
        disablePadding: true,
        label: '정산상태',
      },
    ];
    return data;
  };

  const getList = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case PAYMENT_MENU_TYPE.PAYMENT:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActPaymentFilter type={con} handleFilter={setFilter} />
            </div>
            <ActTable data={paymentDummy()} />
          </div>
        );

      case PAYMENT_MENU_TYPE.SETTLEMENT:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActSettlementFilter type={con} handleFilter={setFilter} />
            </div>
            <ActTable data={settlementDummy()} />
          </div>
        );
    }
  };
  return <div className="col max-height">{getList(con)}</div>;
};
export default PaymentList;
