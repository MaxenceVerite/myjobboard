// AuthProvider.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../contexts/AuthContext';
import { fetchCurrentSession, login, logout } from '../store/slices/authSlice';
import { RootState } from '../store/store';

const AuthProvider = ({ children }) => {
  const dispatch:any = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentSession());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const loginHandler = (mail, password)=> {
    dispatch(login({mail: mail, password: password}))
  }

  // Les méthodes que vous souhaitez exposer
  const contextValue:any = {
    ...authState,
    logout: logoutHandler,
    login: loginHandler,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
