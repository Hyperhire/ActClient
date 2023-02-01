import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import dayjs from 'dayjs';
import ActTable from '../../components/atoms/ActTable';
import ActMemberIndFilter from '../../components/organisms/ActMemberIndFilter';
import { DONATION_MENU_TYPE, MEMBER_TYPE } from '../../constants/constant';
import ActMemberOrgFilter from '../../components/organisms/ActMemberOrgFilter';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
// limit, lastIndex, from, to, status, loginType, keyword
const MemberList = () => {
  const memberType = useOutletContext();
  const [filter, setFilter] = useState();
  const navigate = useNavigate();
  const { id = undefined } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [list, setList] = useState([]);
  const query =
    memberType === MEMBER_TYPE.INDIVIDUAL
      ? `?limit=10&lastIndex=${(currentPage - 1) * 10 || 0}&from=${filter ? filter?.startDate : ''}&to=${filter ? filter?.endDate : ''}&status=${filter?.memberState || ''}&loginType=${
          filter?.memberType || ''
        }&keyword=${filter?.memberSearch || ''}`
      : `?limit=10&lastIndex=${(currentPage - 1) * 10 || 0}&from=${filter ? filter?.startDate : ''}&to=${filter ? filter?.endDate : ''}&status=${filter?.memberState || ''}&keyword=${
          filter?.memberSearch || ''
        }`;

  const url = `${memberType === MEMBER_TYPE.INDIVIDUAL ? api.user.list : api.organization.list}${query}`;
  const { isFetching, isLoading, isSuccess, data, isError, error, refetch } = useReactQuery([`user-list`, currentPage], url, {
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
  }, [memberType, id, refetch, filter]);

  const indData = () => {
    const data = { rows: [], headers: [] };
    list.forEach((v, i) => {
      data.rows.push({
        index: i,
        registrationDate: dayjs(v.createdAt).format('YYYY.MM.DD'),
        id: v._id,
        type: v.loginType,
        email: v.email,
        nickname: v.nickname,
        name: v.nickname,
        mobile: v.indInfo?.mobile || '',
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
        id: 'registrationDate',
        numeric: false,
        disablePadding: true,
        label: '가입일시',
      },
      {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
      },
      {
        id: 'type',
        numeric: false,
        disablePadding: true,
        label: '계정유형',
      },
      {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: '이메일주소',
      },
      {
        id: 'nickname',
        numeric: false,
        disablePadding: true,
        label: '닉네임',
      },
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: '실명',
      },
      {
        id: 'mobile',
        numeric: false,
        disablePadding: true,
        label: '휴대폰번호',
      },
      {
        id: 'state',
        numeric: false,
        disablePadding: true,
        label: '회원상태',
      },
    ];
    return data;
  };
  const orgList = () => {
    const data = { rows: [], headers: [] };
    list.forEach((v, i) => {
      data.rows.push({
        index: i,
        registrationDate: dayjs(v.createdAt).format('YYYY.MM.DD'),
        id: v._id,
        nickname: v.nickname,
        orgName: v.name,
        managerName: v.manager?.name,
        managerMobile: v.manager?.mobile,
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
        id: 'registrationData',
        numeric: false,
        disablePadding: true,
        label: '가입일시',
      },
      {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
      },
      {
        id: 'nickname',
        numeric: false,
        disablePadding: true,
        label: '닉네임',
      },
      {
        id: 'orgName',
        numeric: false,
        disablePadding: true,
        label: '단체명',
      },
      {
        id: 'managerName',
        numeric: false,
        disablePadding: true,
        label: '담당자성함',
      },
      {
        id: 'managerMobile',
        numeric: false,
        disablePadding: true,
        label: '담당자연락처',
      },
      {
        id: 'state',
        numeric: false,
        disablePadding: true,
        label: '회원상태',
      },
    ];
    return data;
  };

  const onHandleClickItem = item => {
    navigate(item.id, { state: { memberType } });
  };

  const onHandleChangePage = (e, page) => {
    setCurrentPage(page);
  };

  return isLoading || isFetching ? (
    <div>loading...</div>
  ) : (
    <div className="col max-height">
      {id ? (
        <Outlet />
      ) : memberType === MEMBER_TYPE.INDIVIDUAL ? (
        <div className="col max-height ">
          <div className="max-height flex-1">
            <ActMemberIndFilter type={memberType} filter={filter} handleFilter={setFilter} />
          </div>
          <ActTable data={indData()} handleClickItem={onHandleClickItem} />
          <div className="row align-center justify-center">
            <Pagination count={Math.ceil(pagination?.totalCount / 10) || 0} defaultPage={1} page={currentPage} variant="outlined" shape="rounded" onChange={onHandleChangePage} />
          </div>
        </div>
      ) : (
        <div className="col max-height ">
          <div className="max-height flex-1">
            <ActMemberOrgFilter type={memberType} filter={filter} handleFilter={setFilter} />
          </div>
          <ActTable data={orgList()} handleClickItem={onHandleClickItem} />
          <div className="row align-center justify-center">
            <Pagination count={Math.ceil(pagination?.totalCount / 10) || 0} defaultPage={1} page={currentPage} variant="outlined" shape="rounded" onChange={onHandleChangePage} />
          </div>
        </div>
      )}
    </div>
  );
};
export default MemberList;
