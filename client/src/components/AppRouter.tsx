import React from 'react';
import { routes } from '../utils/routesConsts';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AppRouter: React.FC = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      {isAuth ? (
        <Routes>
          <Route path={routes.HOME_ROUTE} element={<HomePage />} />
          <Route
            path={'*'}
            element={<Navigate to={routes.HOME_ROUTE} replace />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path={routes.LOGIN_ROUTE} element={<LoginPage />} />;
          <Route path={routes.REGISTRATION_ROUTE} element={<RegisterPage />} />;
          <Route
            path={'*'}
            element={<Navigate to={routes.LOGIN_ROUTE} replace />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
