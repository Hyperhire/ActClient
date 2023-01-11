import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ActTable from '../../components/atoms/ActTable';
import ActMemberIndFilter from '../../components/organisms/ActMemberIndFilter';
import { MEMBER_TYPE } from '../../constants/constant';
import ActMemberOrgFilter from '../../components/organisms/ActMemberOrgFilter';

const MemberList = () => {
  const con = useOutletContext();
  const [filter, setFilter] = useState();
  useEffect(() => {
    console.log('filter', filter);
  }, [filter]);

  const indDummy = () => {
    let index = 0;
    const data = { rows: [], headers: [] };
    while (index < 500) {
      index++;
      data.rows.push({
        index: index,
        registrationDate: `registrationDate ${index}`,
        id: `id ${index}`,
        type: `type ${index}`,
        email: `email ${index}`,
        nickname: `nickname ${index}`,
        name: `name ${index}`,
        mobile: `mobile ${index}`,
        state: `state ${index}`,
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
  const orgDummy = () => {
    let index = 0;
    const data = { rows: [], headers: [] };
    while (index < 500) {
      index++;
      data.rows.push({
        index: index,
        registrationData: `registrationData ${index}`,
        id: `id ${index}`,
        nickname: `nickname ${index}`,
        orgName: `orgName ${index}`,
        managerName: `managerName ${index}`,
        managerMobile: `managerMobile ${index}`,
        state: `state ${index}`,
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
        id: 'registrationData',
        numeric: false,
        disablePadding: true,
        label: 'registrationData',
      },
      {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'id',
      },
      {
        id: 'nickname',
        numeric: false,
        disablePadding: true,
        label: 'nickname',
      },
      {
        id: 'orgName',
        numeric: false,
        disablePadding: true,
        label: 'orgName',
      },
      {
        id: 'managerName',
        numeric: false,
        disablePadding: true,
        label: 'managerName',
      },
      {
        id: 'managerMobile',
        numeric: false,
        disablePadding: true,
        label: 'managerMobile',
      },
      {
        id: 'state',
        numeric: false,
        disablePadding: true,
        label: 'state',
      },
    ];
    return data;
  };

  return (
    <div className="col max-height">
      {con === MEMBER_TYPE.INDIVIDUAL ? (
        <div className="col max-height ">
          <div className="max-height flex-1">
            <ActMemberIndFilter type={con} handleFilter={setFilter} />
          </div>
          <ActTable data={indDummy()} />
        </div>
      ) : (
        <div className="col max-height ">
          <div className="max-height flex-1">
            <ActMemberOrgFilter type={con} handleFilter={setFilter} />
          </div>
          <ActTable data={orgDummy()} />
        </div>
      )}
    </div>
  );
};
export default MemberList;
