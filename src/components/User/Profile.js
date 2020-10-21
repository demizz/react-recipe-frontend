import React from 'react';
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import WithAuth from '../WithAuth';

const Profile = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 border border-primary rounded">
          <UserInfo />
        </div>
        <div className="col-md-7 offset-md-1">
          <UserRecipes />
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Profile);
