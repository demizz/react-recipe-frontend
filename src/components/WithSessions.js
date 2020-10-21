import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../queries';
const WithSessions = (Component) => (props) => {
  return (
    <Query query={GET_CURRENT_USER}>
      {({ data, error, loading, refetch }) => {
        console.log(error);
        if (loading) return null;

        return (
          data && <Component {...props} refetch={refetch} session={data} />
        );
      }}
    </Query>
  );
};

export default WithSessions;
