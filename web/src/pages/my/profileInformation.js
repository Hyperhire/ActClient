import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ReactComponent as ProfileIcon } from 'styles/assets/icons/profile/white.svg';
import { usersAtom } from '../../state';
import { MEMBER_TYPE } from '../../constants/constant';
import { ReactComponent as ActIcon } from 'styles/assets/icons/label/act_aqua.svg';
import ActButton from '../../components/atoms/ActButton';
import { ReactComponent as Share } from '../../styles/assets/icons/share.svg';
import { downloadFile } from '../../utils/downloadFile';
const ProfileInformation = ({ setOption }) => {
  const user = useRecoilValue(usersAtom);

  useEffect(() => {
    setOption({
      title: '프로필 정보',
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
  };

  return (
    <div className="profile-information-wrapper">
      <div className="profile-information-content-wrapper">
        <div className="profile-information-image-wrapper">
          {user?.userType === MEMBER_TYPE.INDIVIDUAL ? user.info.profileUrl ? <img src={user.info.profileUrl} alt="user-profile-image" /> : <ProfileIcon /> : <ProfileIcon />}
          <div className="profile-information-image-icon">
            <ActIcon />
          </div>
        </div>
        <div className="profile-information-label-wrapper">{user?.info.nickname}</div>
      </div>
      <div className="profile-information-download-button-wrapper">
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
          handleOnClick={() => onHandleClickDownload(user.info.profileUrl)}
        />
      </div>
    </div>
  );
};
export default ProfileInformation;
