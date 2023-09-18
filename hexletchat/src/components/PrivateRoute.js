/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import routes from '../routes';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth.user) {
    return children;
  }
  return (
    <Navigate to={routes.login} state={{ from: location }} />
  );
};
export default PrivateRoute;
