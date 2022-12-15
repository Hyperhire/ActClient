import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import useModal from '../hooks/useModal';
import ActSpinner from '../components/atoms/ActSpinner';
import { request } from '../utils/axiosClient';
import { api } from '../repository';

const Payment = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const { orderId, status } = useParams();
  const [searchParams] = useSearchParams();
  const pg_token = searchParams.get('pg_token');

  useEffect(() => {
    switch (status) {
      case 'approval':
        request({
          url: api.order.complete,
          method: 'post',
          data: { id: orderId, pg_token },
        })
          .then(response => {
            if (response.status !== 200) {
              showModal({
                open: true,
                message: `결제 승인 실패`,
              });
            } else {
              showModal({
                open: true,
                message: `결제 승인 성공.`,
                handleConfirm: () => navigate('/my/DonationHistory'),
              });
            }
          })
          .catch(() => {
            showModal({
              open: true,
              message: `결제 승인 실패`,
            });
          });

        break;
      case 'fail':
        showModal({
          open: true,
          message: `결제 실패.`,
          handleConfirm: () => navigate('/'),
        });
        break;
      default:
        showModal({
          open: true,
          message: `결제 취소.`,
          handleConfirm: () => navigate('/'),
        });
        break;
    }
  }, [orderId, status]);
  return <ActSpinner />;
};
export default Payment;
