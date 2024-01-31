import React from 'react';
import { Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useLocation, Navigate } from 'react-router-dom';

const AuthenticatedComponent = ({children}) => {

 
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};


export default AuthenticatedComponent;