import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import dayjs from 'dayjs';
import ActOrganizationFilter from 'components/organisms/ActOrganizationFilter';
import ActTable from 'components/atoms/ActTable';
import { MEMBER_TYPE, ORGANIZATION_MENU_TYPE } from 'constants/constant';
import { api } from '../../repository';
import { useReactQuery } from '../../hooks/useReactQuery';

const OrganizationList = () => {
  const postType = useOutletContext();
  const [filter, setFilter] = useState();
  const { id = undefined } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [list, setList] = useState([]);
  const query = `?limit=10&lastIndex=${(currentPage - 1) * 10 || 0}`;
  const url = `${postType === ORGANIZATION_MENU_TYPE.NOTICE ? api.notice.list : postType === ORGANIZATION_MENU_TYPE.NEWS ? api.news.list : api.campaign.list}${query}`;
  const { isFetching, isLoading, isSuccess, data, isError, error, refetch } = useReactQuery([`${postType}-list`, currentPage], url, {
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
  }, [postType, id, refetch]);

  useEffect(() => {
    console.log('filter', filter);
  }, [filter]);

  const parseData = type => {
    const data = { rows: [], headers: [] };
    list.length > 0 &&
      list.forEach((v, i) => {
        data.rows.push({
          index: i,
          id: v._id,
          registrationDate: dayjs(v.createdAt).format('YYYY.MM.DD'),
          orgName: v.org.name,
          title: v.title,
          state: v.status,
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
        id: 'registrationDate',
        numeric: false,
        disablePadding: true,
        label: '등록일시',
      },
      {
        id: 'orgName',
        numeric: false,
        disablePadding: true,
        label: '단체명',
      },
      {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: `${type === ORGANIZATION_MENU_TYPE.NOTICE ? '공시 제목' : type === ORGANIZATION_MENU_TYPE.NEWS ? '소식 제목' : '캠페인 제목'}`,
      },
      {
        id: 'state',
        numeric: false,
        disablePadding: true,
        label: '승인상태',
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
      case ORGANIZATION_MENU_TYPE.NOTICE:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOrganizationFilter type={type} handleFilter={setFilter} />
            </div>
            <ActTable data={parseData(type)} handleClickItem={onHandleClickItem} />
          </div>
        );

      case ORGANIZATION_MENU_TYPE.NEWS:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOrganizationFilter type={type} handleFilter={setFilter} />
            </div>
            <ActTable data={parseData(type)} handleClickItem={onHandleClickItem} />
          </div>
        );

      case ORGANIZATION_MENU_TYPE.CAMPAIGN:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOrganizationFilter type={type} handleFilter={setFilter} />
            </div>
            <ActTable data={parseData(type)} handleClickItem={onHandleClickItem} />
          </div>
        );
    }
  };
  const onHandleChangePage = (e, page) => {
    setCurrentPage(page);
  };
  return isFetching || isLoading ? (
    <div>loading...</div>
  ) : (
    <div className="col max-height">
      {getList(postType)}
      <div className="row align-center justify-center">
        <Pagination count={Math.ceil(pagination?.totalCount / 10) || 0} defaultPage={1} page={currentPage} variant="outlined" shape="rounded" onChange={onHandleChangePage} />
      </div>
    </div>
  );
};
export default OrganizationList;
