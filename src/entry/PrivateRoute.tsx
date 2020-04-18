import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute: React.FC<any> = ({ children, ...rest }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Redirect to={'/login'} />;
  } else {
    return <Route {...rest}>{children}</Route>;
  }
};

export { PrivateRoute };
