import React from 'react';

import { Redirect } from 'react-router-dom';

const WithAuth = (Component) => (props) => {
  const token = localStorage.getItem('token');

  return token ? <Component {...props} /> : <Redirect to="/" />;
};

export default WithAuth;
