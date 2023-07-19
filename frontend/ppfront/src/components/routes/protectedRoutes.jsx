import React from 'react';
import { Outlet } from 'react-router-dom';
import auth from '../services/authService';
import utils from '../utils';
import config from '../config';

const ProtectedRoutes = ({
    redirectPath = config.redirectPathUnauthenticated,
    children,
}) => {
    if (!auth.getCurrentUser()) {
        return utils.NavigateTo(redirectPath, window.location.pathname);
      }
      return children ? children : <Outlet />;
};

export default ProtectedRoutes;