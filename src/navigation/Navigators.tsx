import React, { useEffect } from 'react';
import UserNavigator from './UserNavigator';
import GuestNavigator from './GuestNavigator';
import { useAppDispatch, useAppSelector } from 'store';
import { userState } from 'store/reducers';
import { auth } from 'core';
import { setToken } from 'store/reducers/AppSlice';
import { loadUser } from 'store/reducers/UserSlice';

const Navigators = () => {
  const user = useAppSelector(state => userState(state));
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser?.getIdToken().then((result) => {
        dispatch(setToken(result));
        dispatch(loadUser({}));
      });
    }
  }, []);

  return user ? <UserNavigator /> : <GuestNavigator />;
};

export default Navigators;
