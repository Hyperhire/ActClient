import { useLocation, useParams } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const { status } = useParams();
  switch (status) {
    case 'approve':
      console.log('approve');
      break;
    case 'fail':
      console.log('fail');
      break;
    default:
      console.log('cancel and something');
      break;
  }
  return null;
};
export default Payment;
