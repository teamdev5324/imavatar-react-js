import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {
  APP_CONSTANTS,
  ROUTER_URL_CONSTANT,
} from './constants/routerUriConstants';
import { getItem } from './utils/storage';

const ProtectedRoutes = () => {
  const token = getItem(APP_CONSTANTS.auth_token);

  return token ? <Outlet /> : <Outlet />;
};

export default ProtectedRoutes;
