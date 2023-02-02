import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import ActTable from 'components/atoms/ActTable';
import { DONATION_MENU_TYPE, MEMBER_TYPE, OPERATION_MENU_TYPE } from 'constants/constant';
import ActOperationFilter from '../../components/organisms/ActOperationFilter';
import { api } from '../../repository';
import { useReactQuery } from '../../hooks/useReactQuery';
import ActBannerManager from '../../components/organisms/ActBannerManager';
import ActButton from '../../components/atoms/ActButton';

const OperationList = () => {
  const operationType = useOutletContext();
  const navigate = useNavigate();
  const [filter, setFilter] = useState();
  const { id = undefined } = useParams();
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);

  const query =
    operationType === OPERATION_MENU_TYPE.FAQ
      ? `?limit=10&lastIndex=${(currentPage - 1) * 10 || 0}&from=${filter ? filter?.startDate : ''}&to=${filter ? filter?.endDate : ''}&show=${
          filter?.show === 'all' ? '' : filter?.show || ''
        }&keyword=${filter?.search || ''}`
      : '';
  const url = `${operationType === OPERATION_MENU_TYPE.FAQ ? api.faq.list : api.banner.list}${query}`;
  const { isFetching, isLoading, isSuccess, data, isError, error, refetch } = useReactQuery(`${operationType}-list`, url, {
    refetchOnWindowFocus: false,
    staleTime: 2000,
  });
  useEffect(() => {
    if (isSuccess && data) {
      setList(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    refetch();
  }, [operationType, id, refetch, filter]);

  const parseData = () => {
    const data = { rows: [], headers: [] };
    list.forEach((v, i) => {
      data.rows.push({
        index: i,
        id: v._id,
        createdAt: v.createdAt,
        title: v.question,
        displayState: v.show ? '노출' : '비노출',
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
        id: 'index',
        numeric: false,
        disablePadding: true,
        label: 'ID',
      },
      {
        id: 'createdAt',
        numeric: false,
        disablePadding: true,
        label: '등록일',
      },
      {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'FAQ 제목',
      },
      {
        id: 'displayState',
        numeric: false,
        disablePadding: true,
        label: '노출상태',
      },
    ];
    return data;
  };
  const onHandleClickItem = item => {
    console.log('onHandleClickItem', item);
    navigate(item.id);
    // navigate(`/organization/${postType}/${item.id}`);
  };
  const onHandleChangePage = (e, page) => {
    setCurrentPage(page);
  };
  const getList = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case OPERATION_MENU_TYPE.FAQ:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOperationFilter filter={filter} handleFilter={setFilter} />
            </div>
            <ActTable data={parseData()} handleClickItem={onHandleClickItem} />
            <div className="row align-center justify-center">
              <Pagination count={Math.ceil(pagination?.totalCount / 10) || 0} defaultPage={1} page={currentPage} variant="outlined" shape="rounded" onChange={onHandleChangePage} />
            </div>
            <div className="row align-center justify-end">
              <ActButton label={<div className="padding-row-4">추가</div>} handleOnClick={() => navigate('post')} />
            </div>
          </div>
        );
      case OPERATION_MENU_TYPE.BANNER:
        return (
          <div className="max-height">
            <ActBannerManager data={data} onFinish={() => refetch()} />
          </div>
        );
    }
  };
  return isFetching || isLoading ? <div>loading...</div> : <div className="col max-height">{getList(operationType)}</div>;
};
export default OperationList;
