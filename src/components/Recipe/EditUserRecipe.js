import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import Spinner from '../Spinner';
import Error from '../Error';
import { GET_RECIPE } from '../../queries';
import UserRecipe from './UserRecipe';

const EditUserRecipe = ({ match }) => {
  const { id } = match.params;

  return (
    <Query query={GET_RECIPE} variables={{ _id: id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <Error error={error.message} />;

        return <UserRecipe data={data.getRecipe} id={id} />;
      }}
    </Query>
  );
};

export default withRouter(EditUserRecipe);
