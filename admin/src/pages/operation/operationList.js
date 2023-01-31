import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ActTable from 'components/atoms/ActTable';
import { MEMBER_TYPE, OPERATION_MENU_TYPE } from 'constants/constant';
import ActOperationFilter from '../../components/organisms/ActOperationFilter';
import { api } from '../../repository';
import { useReactQuery } from '../../hooks/useReactQuery';

const OperationList = () => {
  const operationType = useOutletContext();
  const navigate = useNavigate();
  const [filter, setFilter] = useState();
  const { id = undefined } = useParams();
  const [list, setList] = useState([]);
  const query = `?keyword=${filter?.search || ''}`;
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
  }, [operationType, id, refetch]);
  useEffect(() => {
    console.log('filter', filter);
  }, [filter]);

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
  const getList = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case OPERATION_MENU_TYPE.FAQ:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOperationFilter type={type} handleFilter={setFilter} />
            </div>
            <ActTable data={parseData()} handleClickItem={onHandleClickItem} />
          </div>
        );

      case OPERATION_MENU_TYPE.BANNER:
        return (
          <div className="max-height">
            <div>배너관리</div>
          </div>
        );
    }
  };
  return isFetching || isLoading ? <div>loading...</div> : <div className="col max-height">{getList(operationType)}</div>;
};
export default OperationList;
