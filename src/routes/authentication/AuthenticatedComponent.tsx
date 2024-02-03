import React, { useContext } from 'react';
import { Route} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { useLocation, Navigate } from 'react-router-dom';

const AuthenticatedComponent = ({children}) => {

  
  const isConnected = useSelector((state: RootState) => state.auth.isConnected);
  const location = useLocation();

  if (!isConnected) {

    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};


export default AuthenticatedComponent;