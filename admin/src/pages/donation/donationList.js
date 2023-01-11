import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ActTable from 'components/atoms/ActTable';
import { DONATION_MENU_TYPE } from 'constants/constant';
import ActDonationOrgFilter from 'components/organisms/ActDonationOrgFilter';
import ActDonationCampaignFilter from 'components/organisms/ActDonationCampaignFilter';

const DonationList = () => {
  const con = useOutletContext();
  console.log('DonationList', con);
  const [filter, setFilter] = useState();

  useEffect(() => {
    console.log('filter', filter);
  }, [filter]);
  const orgDummy = () => {
    let index = 0;
    const data = { rows: [], headers: [] };
    while (index < 123) {
      index++;
      data.rows.push({
        index: index,
        donationStartedAt: `donationStartedAt ${index}`,
        id: `id ${index}`,
        name: `name ${index}`,
        orgName: `orgName ${index}`,
        donationType: `donationType ${index}`,
        amount: `amount ${index}`,
        donationStatus: `donationStatus ${index}`,
        nftId: `nftId ${index}`,
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
        id: 'donationStartedAt',
        numeric: false,
        disablePadding: true,
        label: '후원시작일시',
      },
      {
        id: 'id',
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
  const campaignDummy = () => {
    let index = 0;
    const data = { rows: [], headers: [] };
    while (index < 91) {
      index++;
      data.rows.push({
        index: index,
        donationStartedAt: `donationStartedAt ${index}`,
        id: `id ${index}`,
        name: `name ${index}`,
        orgName: `orgName ${index}`,
        campaignTitle: `campaignTitle ${index}`,
        amount: `amount ${index}`,
        nftId: `nftId ${index}`,
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
        id: 'donationStartedAt',
        numeric: false,
        disablePadding: true,
        label: '후원시작일시',
      },
      {
        id: 'id',
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

  const getList = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case DONATION_MENU_TYPE.ORG:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActDonationOrgFilter type={con} handleFilter={setFilter} />
            </div>
            <ActTable data={orgDummy()} />
          </div>
        );
      case DONATION_MENU_TYPE.CAMPAIGN:
        return (
          <div className="col max-height ">
            <div className="max-height flex-1">
              <ActDonationCampaignFilter type={con} handleFilter={setFilter} />
            </div>
            <ActTable data={campaignDummy()} />
          </div>
        );
    }
  };
  return <div className="col max-height">{getList(con)}</div>;
};
export default DonationList;
