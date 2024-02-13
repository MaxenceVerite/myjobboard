// src/providers/AuthProvider.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkSession as checkSessionAction } from '../store/slices/authSlice';
import { CircularProgress, Paper } from '@mui/material';

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch<any>();
  
  useEffect(() => {
    const checkSession = async () => {
      await dispatch(checkSessionAction());
      setLoading(false);
    };
   
    checkSession();
    
  }, [dispatch]);

  if (isLoading) {
    return <CircularProgress/>
  }

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
