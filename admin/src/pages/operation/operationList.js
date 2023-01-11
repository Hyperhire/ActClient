import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ActTable from 'components/atoms/ActTable';
import { OPERATION_MENU_TYPE } from 'constants/constant';
import ActOperationFilter from '../../components/organisms/ActOperationFilter';

const OperationList = () => {
  const con = useOutletContext();
  console.log('OperationList', con);
  const [filter, setFilter] = useState();

  useEffect(() => {
    console.log('filter', filter);
  }, [filter]);
  const FAQDummy = () => {
    let index = 0;
    const data = { rows: [], headers: [] };
    while (index < 51) {
      index++;
      data.rows.push({
        index: index,
        createdAt: `createdAt ${index}`,
        title: `title ${index}`,
        displayState: `displayState ${index}`,
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

  const getList = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case OPERATION_MENU_TYPE.FAQ:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActOperationFilter type={con} handleFilter={setFilter} />
            </div>
            <ActTable data={FAQDummy()} />
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
  return <div className="col max-height">{getList(con)}</div>;
};
export default OperationList;
