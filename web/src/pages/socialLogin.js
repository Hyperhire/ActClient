import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import useModal from 'hooks/useModal';
import ActSpinner from 'components/atoms/ActSpinner';
import { request } from 'utils/axiosClient';
import { api } from 'repository';

const SocialLogin = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const { sns } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    switch (sns) {
      case 'kakao':
        request({
          url: api.auth.socialLogin,
          method: 'post',
          data: { code },
        })
          .then(response => {
            if (response.status !== 200) {
              showModal({
                open: true,
                message: `카카오 로그인 실패`,
                handleConfirm: () => navigate('/'),
              });
            } else {
              showModal({
                open: true,
                message: `카카오 로그인 성공.`,
                handleConfirm: () => {
                  navigate('/', { replace: true });
                },
              });
            }
          })
          .catch(() => {
            showModal({
              open: true,
              message: `결제 승인 실패`,
              handleConfirm: () => navigate('/'),
            });
          });
        break;

      default:
        showModal({
          open: true,
          message: `로그인 실패`,
          handleConfirm: () => navigate('/'),
        });
        break;
    }
  }, [sns]);
  return <ActSpinner />;
};
export default SocialLogin;
