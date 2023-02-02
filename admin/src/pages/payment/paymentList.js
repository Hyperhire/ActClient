import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Pagination from '@mui/material/Pagination';
import ActTable from 'components/atoms/ActTable';
import { DONATION_MENU_TYPE, MEMBER_TYPE, OPERATION_MENU_TYPE, PAYMENT_MENU_TYPE } from 'constants/constant';
import ActPaymentFilter from 'components/organisms/ActPaymentFilter';
import ActSettlementFilter from 'components/organisms/ActSettlementFilter';
import { api } from '../../repository';
import { useReactQuery } from '../../hooks/useReactQuery';

const PaymentList = () => {
  const paymentMenuType = useOutletContext();
  const { id = undefined } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [list, setList] = useState([]);
  const [paymentFilter, setPaymentFilter] = useState();
  const [withdrawFilter, setWithdrawFilter] = useState();

  const query =
    paymentMenuType === PAYMENT_MENU_TYPE.PAYMENT
      ? `?limit=10&lastIndex=${(currentPage - 1) * 10 || 0}&from=${paymentFilter ? paymentFilter?.startDate : ''}&to=${paymentFilter ? paymentFilter?.endDate : ''}&targetType=${
          paymentFilter?.targetType === 'all' ? '' : paymentFilter?.targetType || ''
        }&paidStatus=${paymentFilter?.paidStatus === 'all' ? '' : paymentFilter?.paidStatus || ''}&paymentType=${
          paymentFilter?.paymentType === 'all' ? '' : paymentFilter?.paymentType || ''
        }&withdrawRequestStatus=${paymentFilter?.withdrawRequestStatus === 'all' ? '' : paymentFilter?.withdrawRequestStatus || ''}&keyword=${paymentFilter?.search || ''}`
      : `?limit=10&lastIndex=${(currentPage - 1) * 10 || 0}&from=${withdrawFilter ? withdrawFilter?.startDate : ''}&to=${withdrawFilter ? withdrawFilter?.endDate : ''}&status=${
          withdrawFilter?.status === 'all' ? '' : withdrawFilter?.status || ''
        }&keyword=${withdrawFilter?.search || ''}`;
  const url = `${paymentMenuType === PAYMENT_MENU_TYPE.PAYMENT ? api.order.list : api.withdraw.list}${query}`;
  const { isFetching, isLoading, isSuccess, data, isError, error, refetch } = useReactQuery([`{${paymentMenuType}-list`, currentPage], url, {
    refetchOnWindowFocus: false,
    staleTime: 2000,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setList(data.list);
      setPagination(data.pagination);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    refetch();
  }, [paymentMenuType, id, refetch, paymentFilter, withdrawFilter]);

  const parseOrderData = () => {
    const data = { rows: [], headers: [] };
    list.forEach((v, i) => {
      data.rows.push({
        index: i,
        id: v._id,
        paymentDate: dayjs(v.createdAt).format('YYYY.MM.DD'),
        name: v.user?.indInfo?.name || '',
        donorId: v.user?.email || '',
        orgName: v.org.name,
        donationId: v._id,
        paymentType: v.pg,
        donationType: v.isRecurring ? '정기후원' : '일시후원',
        paymentStatus: v.paidStatus,
        amount: v.amount.toLocaleString(),
      });
    });
    data.headers = [
      {
        id: 'index',
        numeric: false,
        disablePadding: true,
        label: 'NO',
      },
      {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
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
        id: 'donorId',
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

  const parseWithdrawData = () => {
    const data = { rows: [], headers: [] };
    list.forEach((v, i) => {
      data.rows.push({
        index: i,
        id: v._id,
        settlementDate: dayjs(v.createdAt).format('YYYY.MM.DD'),
        orgId: v.orgId,
        orgName: v.org?.name || '',
        settlementAmount: v.amount.toLocaleString(),
        settlementStatus: v.status,
      });
    });

    data.headers = [
      {
        id: 'index',
        numeric: false,
        disablePadding: true,
        label: 'NO',
      },
      {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
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
  const onHandleClickItem = item => {
    console.log('onHandleClickItem', item);
    navigate(item.id);
  };
  const onHandleChangePage = (e, page) => {
    setCurrentPage(page);
  };
  const getList = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case PAYMENT_MENU_TYPE.PAYMENT:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActPaymentFilter type={paymentMenuType} filter={paymentFilter} handleFilter={setPaymentFilter} />
            </div>
            <ActTable data={parseOrderData()} handleClickItem={onHandleClickItem} />
            <div className="row align-center justify-center">
              <Pagination count={Math.ceil(pagination?.totalCount / 10) || 0} defaultPage={1} page={currentPage} variant="outlined" shape="rounded" onChange={onHandleChangePage} />
            </div>
          </div>
        );

      case PAYMENT_MENU_TYPE.SETTLEMENT:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActSettlementFilter type={paymentMenuType} filter={withdrawFilter} handleFilter={setWithdrawFilter} />
            </div>
            <ActTable data={parseWithdrawData()} handleClickItem={onHandleClickItem} />
            <div className="row align-center justify-center">
              <Pagination count={Math.ceil(pagination?.totalCount / 10) || 0} defaultPage={1} page={currentPage} variant="outlined" shape="rounded" onChange={onHandleChangePage} />
            </div>
          </div>
        );
    }
  };
  return <div className="col max-height">{getList(paymentMenuType)}</div>;
};
export default PaymentList;
