import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import dayjs from 'dayjs';
import ActOrganizationCampaignFilter from 'components/organisms/ActOrganizationCampaignFilter';
import ActTable from 'components/atoms/ActTable';
import { MEMBER_TYPE, ORGANIZATION_MENU_TYPE, PAYMENT_MENU_TYPE } from 'constants/constant';
import { api } from '../../repository';
import { useReactQuery } from '../../hooks/useReactQuery';
import ActOrganizationNoticeFilter from '../../components/organisms/ActOrganizationNoticeFilter';
import ActOrganizationNewsFilter from '../../components/organisms/ActOrganizationNewsFilter';

const OrganizationList = () => {
  const postType = useOutletContext();
  const [noticeFilter, setNoticeFilter] = useState();
  const [newsFilter, setNewsFilter] = useState();
  const [campaignFilter, setCampaignFilter] = useState();
  const { id = undefined } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [list, setList] = useState([]);

  const query =
    postType === ORGANIZATION_MENU_TYPE.NOTICE
      ? `?limit=10&lastIndex=${(currentPage - 1) * 10 || 0}&from=${noticeFilter ? noticeFilter?.startDate : ''}&to=${noticeFilter ? noticeFilter?.endDate : ''}&status=${
          noticeFilter?.approvalStatus === 'all' ? '' : noticeFilter?.approvalStatus || ''
        }&keyword=${noticeFilter?.search || ''}`
      : postType === ORGANIZATION_MENU_TYPE.NEWS
      ? `?limit=10&lastIndex=${(currentPage - 1) * 10 || 0}&from=${newsFilter ? newsFilter?.startDate : ''}&to=${newsFilter ? newsFilter?.endDate : ''}&status=${
          newsFilter?.approvalStatus === 'all' ? '' : newsFilter?.approvalStatus || ''
        }&keyword=${newsFilter?.search || ''}`
      : `?limit=10&lastIndex=${(currentPage - 1) * 10 || 0}&from=${campaignFilter ? campaignFilter?.startDate : ''}&to=${campaignFilter ? campaignFilter?.endDate : ''}&status=${
          campaignFilter?.approvalStatus === 'all' ? '' : campaignFilter?.approvalStatus || ''
        }&keyword=${campaignFilter?.search || ''}`;

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
  }, [postType, id, refetch, noticeFilter, newsFilter, campaignFilter]);

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
              <ActOrganizationNoticeFilter type={type} filter={noticeFilter} handleFilter={setNoticeFilter} />
            </div>
            <ActTable data={parseData(type)} handleClickItem={onHandleClickItem} />
          </div>
        );

      case ORGANIZATION_MENU_TYPE.NEWS:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOrganizationNewsFilter type={type} filter={newsFilter} handleFilter={setNewsFilter} />
            </div>
            <ActTable data={parseData(type)} handleClickItem={onHandleClickItem} />
          </div>
        );

      case ORGANIZATION_MENU_TYPE.CAMPAIGN:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOrganizationCampaignFilter type={type} filter={campaignFilter} handleFilter={setCampaignFilter} />
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
