import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.2,
};

const Transitions = () => {
  const { pathname } = useLocation();
  const PageLayout = ({ children }) => children;

  return (
    <PageLayout>
      <motion.div key={pathname} initial="initial" animate="in" variants={pageVariants} transition={pageTransition}>
        {' '}
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};
export default Transitions;
