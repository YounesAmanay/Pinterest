import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useCheckToken from '../costumHooks/useCheckToken';
import Loader from './fragments/Loader';

function PrivateRoute() {
  const { isValid, isLoading } = useCheckToken();
  const location = useLocation();

  
  if (isLoading) {
    return <Loader/>;
  }

  if (!isValid) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  
  return <Outlet />;
}

export default PrivateRoute;
