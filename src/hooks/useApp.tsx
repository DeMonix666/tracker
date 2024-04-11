import { auth } from 'core';
import { useAppDispatch } from 'store';
import { userReset } from 'store/reducers/UserSlice';
import { appReset } from 'store/reducers/AppSlice';

export const useApp = () => {
  const dispatch: any = useAppDispatch();

  const logout = async () => {
    const promises = [
      dispatch(appReset()),
      dispatch(userReset()),
    ];

    await Promise.all(promises);
    await auth.signOut();
    console.log('logout');
  };
  return { logout };
};
