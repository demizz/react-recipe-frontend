import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import Error from '../Error';
import { GET_CURRENT_USER } from '../../queries';
const UserInfo = ({ session }) => {
  const formatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString('en-us');
    const newTime = new Date(date).toLocaleTimeString('en-us');
    return `${newDate}at ${newTime}`;
  };
  return (
    <Query query={GET_CURRENT_USER}>
      {({ data: { getCurrentUser }, error, loading }) => {
        console.log(getCurrentUser);
        console.log({ error });
        const user = getCurrentUser;
        if (loading) return <div>Loading...</div>;
        if (error) return <Error error={error.message} />;
        return (
          <div>
            <h3>User Info</h3>
            <p>Username: {user.username}</p>
            <p>Email :{user.email}</p>
            <p>Join Date :{formatDate(user.joinDate)}</p>
            {/* <div className="card bg-white" >
                                    <div className="card-header text-md-center">
                                        User Info
                                    </div>
                                    <ul className="list-group ">
                                        <li className="list-group-item">{user.username}</li>
                                        <li className="list-group-item">{user.email}</li>
                                        <li className="list-group-item">Join Date :{formatDate(user.joinDate)}</li>
                                    </ul>
                                    </div> */}
            <ul>
              <h3>{user.username}'s Favorites</h3>
              {user.favorites &&
                user.favorites.map((favorite) => {
                  return (
                    <li key={favorite._id}>
                      <Link to={`/recipes/${favorite._id}`}>
                        <p>{favorite.name}</p>
                      </Link>
                    </li>
                  );
                })}
              {!user.favorites && (
                <p className="bg-info">
                  you have no favorites currenty go add one
                </p>
              )}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};

export default UserInfo;
