import { useSetRecoilState } from 'recoil';
import { authAtom } from 'state';
const useLogout = () => {
  const setAuth = useSetRecoilState(authAtom);
  return new Promise(resolve => {
    setTimeout(() => {
      setAuth(false);
      resolve(true);
    }, [1000]);
  });
};
export default useLogout;
