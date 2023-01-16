import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import useModal from 'hooks/useModal';
import ActSpinner from 'components/atoms/ActSpinner';
import { request } from 'utils/axiosClient';
import { api } from 'repository';
import { TokenContext } from '../utils/TokenContext';
import { MEMBER_TYPE } from '../constants/constant';

const SocialLogin = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const { sns } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { onRefreshSuccess } = useContext(TokenContext);

  useEffect(() => {
    switch (sns) {
      case 'kakao':
        request({
          url: api.auth.socialLogin('kakao'),
          method: 'post',
          data: { code },
        })
          .then(res => {
            if (res.status === 200) {
              onRefreshSuccess({ token: res.data.data.token }).then(() => {
                navigate(`/`, { replace: true });
              });
            } else {
              switch (res.response.status) {
                case 401:
                  showModal({
                    open: true,
                    message: `회원가입 페이지로 이동합니다.`,
                    handleConfirm: () =>
                      navigate('/register', {
                        state: {
                          loginType: res.response.data.data.loginType,
                          clientId: res.response.data.data.clientId,
                        },
                        replace: true,
                      }),
                  });
                  break;
                default:
                  showModal({
                    open: true,
                    message: `카카오 로그인 실패.`,
                    handleConfirm: () => {
                      navigate('/', { replace: true });
                    },
                  });
                  break;
              }
            }
          })
          .catch(() => {
            showModal({
              open: true,
              message: `로그인 실패`,
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
