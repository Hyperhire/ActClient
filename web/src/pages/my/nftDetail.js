import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ActButton from '../../components/atoms/ActButton';
import { ReactComponent as Share } from 'styles/assets/icons/share.svg';
import Nft from 'styles/assets/images/ntf.svg';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import 'dayjs/locale/ko';
import { downloadFile } from '../../utils/downloadFile';
const NFT_ATTRIBUTES = {
  DONATION_TYPE: 0,
  AMOUNT: 2,
  ORGANIZATION_NAME: 1,
};

const NftDetail = ({ setOption }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state;

  useEffect(() => {
    if (!location.state) navigate('/', { replace: true });
  }, [location.state, navigate]);

  const { isSuccess, data } = useReactQuery(`nft-detail`, api.my.nftDetail(item.orders[0].nft));

  useEffect(() => {
    setOption({
      title: 'ACT NFT 상세정보',
      subtitle: '',
      description: '',
      back: true,
      menu: true,
    });
  }, [setOption]);

  const onHandleClickDownload = async url => {
    await downloadFile(url);
  };
  const onHandleClickShare = e => {
    e.stopPropagation();
    console.log('onHandleClickShare');
  };
  return (
    <div className="nft-detail-wrapper">
      {isSuccess && (
        <>
          <div className="nft-detail-image-wrapper">
            <div className="nft-detail-image">
              <img src={data.metadata.image} alt="nft" />
            </div>
          </div>
          <div className="nft-detail-divider" />
          <div className="nft-detail-content-wrapper">
            <div className="nft-detail-content">
              <div className="nft-detail-content-label">단체명</div>
              <div className="nft-detail-content-data">{data.metadata.attributes[NFT_ATTRIBUTES.ORGANIZATION_NAME].value}</div>
            </div>
            <div className="nft-detail-content">
              <div className="nft-detail-content-label">Token ID</div>
              <div className="nft-detail-content-data">{data.tokenId}</div>
            </div>
            {/*<div className="nft-detail-content">*/}
            {/*  <div className="nft-detail-content-label">기부자 ID</div>*/}
            {/*  <div className="nft-detail-content-data">sss</div>*/}
            {/*</div>*/}
            <div className="nft-detail-content">
              <div className="nft-detail-content-label">금액</div>
              <div className="nft-detail-content-data">{data.metadata.attributes[NFT_ATTRIBUTES.AMOUNT].value}</div>
            </div>
            <div className="nft-detail-content">
              <div className="nft-detail-content-label">날짜</div>

              <div className="nft-detail-content-data">{dayjs(item.orders[0].paidAt).locale('ko').format('YYYY.MM.DD a h:mm')}</div>
            </div>
            <div className="nft-detail-content">
              <div className="nft-detail-content-label">후원방식</div>
              <div className="nft-detail-content-data">{data.metadata.attributes[NFT_ATTRIBUTES.DONATION_TYPE].value}</div>
            </div>
          </div>{' '}
        </>
      )}

      <div className="nft-detail-button-wrapper">
        <ActButton
          radius={0}
          className="primary-button-x-large"
          label={
            <div className="row align-center justify-between padding-row-16">
              <div className="flex-1" />
              <div>다운로드</div>
              <div className="flex-1 justify-end">
                <div onClick={onHandleClickShare}>
                  <Share />
                </div>
              </div>
            </div>
          }
          handleOnClick={() => onHandleClickDownload(data.metadata.image)}
        />
      </div>
    </div>
  );
};
export default NftDetail;
