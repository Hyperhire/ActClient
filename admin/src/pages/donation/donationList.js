import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Pagination from '@mui/material/Pagination';
import ActTable from 'components/atoms/ActTable';
import { DONATION_MENU_TYPE } from 'constants/constant';
import ActDonationOrgFilter from 'components/organisms/ActDonationOrgFilter';
import ActDonationCampaignFilter from 'components/organisms/ActDonationCampaignFilter';
import { api } from '../../repository';
import { useReactQuery } from '../../hooks/useReactQuery';

const DonationList = () => {
  const donationType = useOutletContext();
  const { id = undefined } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState();
  const query = `?limit=10&lastIndex=${(currentPage - 1) * 10 || 0}`;
  const url = `${donationType === DONATION_MENU_TYPE.ORG ? api.donationOrg.list : api.donationCampaign.list}${query}`;
  const { isFetching, isLoading, isSuccess, data, isError, error, refetch } = useReactQuery([`{${donationType}-list`, currentPage], url, {
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
  }, [donationType, id, refetch]);

  useEffect(() => {
    console.log('filter', filter);
  }, [filter]);
  const parseOrgData = () => {
    const data = { rows: [], headers: [] };
    list.forEach((v, i) => {
      data.rows.push({
        index: i,
        id: v._id,
        donationStartedAt: dayjs(v.startedAt).format('YYYY.MM.DD'),
        nonorId: v.user?.email,
        name: v.user?.indInfo?.name,
        orgName: v.org?.name,
        donationType: v.isRecurring ? '정기후원' : '일시후원',
        amount: v.amount.toLocaleString(),
        donationStatus: v.isRecurring ? (v.isTerminated ? '종료' : '진행중') : '-',
        nftId: v.nftId || ``,
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
        id: 'donationStartedAt',
        numeric: false,
        disablePadding: true,
        label: '후원시작일시',
      },
      {
        id: 'nonorId',
        numeric: false,
        disablePadding: true,
        label: '후원자 ID',
      },
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: '후원자 실명',
      },
      {
        id: 'orgName',
        numeric: false,
        disablePadding: true,
        label: '단체명',
      },
      {
        id: 'donationType',
        numeric: false,
        disablePadding: true,
        label: '후원 형태',
      },
      {
        id: 'amount',
        numeric: false,
        disablePadding: true,
        label: '결제금액',
      },
      {
        id: 'donationStatus',
        numeric: false,
        disablePadding: true,
        label: '정기후원상태',
      },
      {
        id: 'nftId',
        numeric: false,
        disablePadding: true,
        label: 'NFT ID',
      },
    ];
    return data;
  };
  const parseCampaignData = () => {
    const data = { rows: [], headers: [] };
    list.forEach((v, i) => {
      data.rows.push({
        index: i,
        id: v._id,
        donationStartedAt: dayjs(v.startedAt).format('YYYY.MM.DD'),
        donorId: v.user?.email,
        name: v.user?.indInfo?.name,
        orgName: v.org?.name,
        campaignTitle: v.campaign?.title,
        amount: v.amount.toLocaleString(),
        nftId: v.nftId || '',
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
        id: 'donationStartedAt',
        numeric: false,
        disablePadding: true,
        label: '후원시작일시',
      },
      {
        id: 'donorId',
        numeric: false,
        disablePadding: true,
        label: '후원자 ID',
      },
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: '후원자 실명',
      },
      {
        id: 'orgName',
        numeric: false,
        disablePadding: true,
        label: '단체명',
      },
      {
        id: 'donationType',
        numeric: false,
        disablePadding: true,
        label: '캠페인명',
      },
      {
        id: 'amount',
        numeric: false,
        disablePadding: true,
        label: '결제금액',
      },
      {
        id: 'nftId',
        numeric: false,
        disablePadding: true,
        label: 'NFT ID',
      },
    ];
    return data;
  };
  const onHandleClickItem = item => {
    navigate(item.id);
  };

  const onHandleChangePage = (e, page) => {
    setCurrentPage(page);
  };
  const getList = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case DONATION_MENU_TYPE.ORG:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActDonationOrgFilter type={donationType} handleFilter={setFilter} />
            </div>
            <ActTable data={parseOrgData()} handleClickItem={onHandleClickItem} />
            <div className="row align-center justify-center">
              <Pagination count={Math.ceil(pagination?.totalCount / 10) || 0} defaultPage={1} page={currentPage} variant="outlined" shape="rounded" onChange={onHandleChangePage} />
            </div>
          </div>
        );
      case DONATION_MENU_TYPE.CAMPAIGN:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActDonationCampaignFilter type={donationType} handleFilter={setFilter} />
            </div>
            <ActTable data={parseCampaignData()} handleClickItem={onHandleClickItem} />
            <div className="row align-center justify-center">
              <Pagination count={Math.ceil(pagination?.totalCount / 10) || 0} defaultPage={1} page={currentPage} variant="outlined" shape="rounded" onChange={onHandleChangePage} />
            </div>
          </div>
        );
    }
  };
  return <div className="col max-height">{getList(donationType)}</div>;
};
export default DonationList;
