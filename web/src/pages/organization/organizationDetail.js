import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ActButton from 'components/atoms/ActButton';
import { ReactComponent as Home } from 'styles/assets/icons/home.svg';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';
import OrganizationCover from 'components/organisms/organization/OrganizationCover';
import OrganizationCampaign from 'components/organisms/organization/OrganizationCampaign';
import { DONATION_TYPE, MEMBER_TYPE, ORGANIZATION_ID } from 'constants/constant';
import OrganizationNews from 'components/organisms/organization/OrganizationNews';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import { usersAtom } from '../../state';
import useModal from '../../hooks/useModal';

const OrganizationDetail = ({ setOption }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useRecoilValue(usersAtom);
  const { showModal } = useModal();
  const { isLoading, isSuccess, data, isError, error } = useReactQuery(`org-detail-${id}`, api.organization.detail(id));
  // const [data, setData] = useState(undefined);
  useEffect(() => {
    setOption({ title: '기부 단체', subtitle: '', description: '', back: true, menu: false });
  }, [setOption]);

  const onClickHandler = () => {
    if (user?.userType !== MEMBER_TYPE.INDIVIDUAL) return;
    if (!user.info.constant.isEmailVerified) {
      showModal({
        open: true,
        message: `이메일 인증이 필요합니다.`,
        handleConfirm: () => navigate('/verify'),
        handleCancel: () => {},
      });
      return;
    }
    if (!user.info.indInfo.dateOfBirth && user.info.indInfo.mobile && user.info.indInfo.name && user.info.indInfo.sex) {
      showModal({
        open: true,
        message: `개인정보 입력이 필요합니다.`,
        handleConfirm: () => navigate('/my/profile'),
        handleCancel: () => {},
      });
      return;
    }
    navigate(`/donation`, { state: { item: data, type: DONATION_TYPE.ORGANIZATION } });
  };

  const onClickHomepage = () => {
    window.open(data.homepageUrl, '_blank');
  };
  return (
    <div className="organization-detail-wrapper">
      {isSuccess && (
        <div className="organization-detail-intro-wrapper">
          <OrganizationCover item={data} />
          <div className="organization-detail-content-wrapper">
            <div className="organization-detail-description">{data.longDescription.replace(/\\n/g, '\n')}</div>
            <div className="organization-detail-shortcut-wrapper">
              <Home />
              <div className="organization-detail-shortcut-label link" onClick={onClickHomepage}>
                홈페이지 바로가기
              </div>
            </div>
            {user?.userType === MEMBER_TYPE.INDIVIDUAL && <ActButton className="tertiary-button-x-large" handleOnClick={onClickHandler} label="후원하기" isDonating={data.isDonating} />}
          </div>
        </div>
      )}
      <div className="organization-detail-divider" />
      <OrganizationCampaign id={id} />
      <div className="organization-detail-divider" />
      <OrganizationNews id={id} />
    </div>
  );
};
export default OrganizationDetail;
