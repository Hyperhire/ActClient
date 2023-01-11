import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ActOrganizationFilter from 'components/organisms/ActOrganizationFilter';
import ActTable from 'components/atoms/ActTable';
import { ORGANIZATION_MENU_TYPE } from 'constants/constant';

const OrganizationList = () => {
  const con = useOutletContext();
  const [filter, setFilter] = useState();

  useEffect(() => {
    console.log('filter', filter);
  }, [filter]);

  const noticeDummy = () => {
    let index = 0;
    const data = { rows: [], headers: [] };
    while (index < 472) {
      index++;
      data.rows.push({
        index: index,
        registrationDate: `registrationDate ${index}`,
        orgName: `orgName ${index}`,
        title: `title ${index}`,
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
        label: '공시제목',
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
  const newsDummy = () => {
    let index = 0;
    const data = { rows: [], headers: [] };
    while (index < 324) {
      index++;
      data.rows.push({
        index: index,
        registrationDate: `registrationDate ${index}`,
        orgName: `orgName ${index}`,
        title: `title ${index}`,
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
        label: '공시제목',
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
  const campaignDummy = () => {
    let index = 0;
    const data = { rows: [], headers: [] };
    while (index < 132) {
      index++;
      data.rows.push({
        index: index,
        registrationData: `registrationData ${index}`,
        orgName: `orgName ${index}`,
        title: `title ${index}`,
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
        label: '공시제목',
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
  const getList = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case ORGANIZATION_MENU_TYPE.NOTICE:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOrganizationFilter type={con} handleFilter={setFilter} />
            </div>
            <ActTable data={noticeDummy()} />
          </div>
        );

      case ORGANIZATION_MENU_TYPE.NEWS:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOrganizationFilter type={con} handleFilter={setFilter} />
            </div>
            <ActTable data={newsDummy()} />
          </div>
        );

      case ORGANIZATION_MENU_TYPE.CAMPAIGN:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOrganizationFilter type={con} handleFilter={setFilter} />
            </div>
            <ActTable data={campaignDummy()} />
          </div>
        );
    }
  };
  return <div className="col max-height">{getList(con)}</div>;
};
export default OrganizationList;
