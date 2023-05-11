import { Outlet, Navigate, useLocation } from 'react-router-dom';

function PrivateRoute() {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return <Outlet />;
}

export default PrivateRoute;