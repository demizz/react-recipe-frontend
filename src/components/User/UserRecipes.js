import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Spinner from '../Spinner';
import {
  GET_USER_RECIPES,
  DELETE_USER_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
} from '../../queries';
const UserRecipes = () => {
  const handleDelete = (deleteUserRecipe) => {
    const confirmDelete = window.confirm(
      'Are you sure your want to delete this recipe'
    );
    if (confirmDelete) {
      deleteUserRecipe().then(({ data }) => {
        console.log(data);
      });
    }
  };
  return (
    <React.Fragment>
      <div className="container">
        <Query query={GET_CURRENT_USER}>
          {({ loading, data, error }) => {
            if (loading) return <Spinner />;
            console.log(data);
            const username = data.getCurrentUser.username;
            return (
              <Query query={GET_USER_RECIPES} variables={{ username }}>
                {({ data, loading, error }) => {
                  if (loading) return <Spinner />;
                  if (error) return <div>{error.message}</div>;
                  console.log(data);
                  return (
                    <React.Fragment>
                      <h3>Your Recipes</h3>
                      {!data.getUserRecipes.length && (
                        <p>you have not added any recipes</p>
                      )}

                      {data.getUserRecipes.map((recipe) => {
                        return (
                          // <li key={recipe._id}>
                          //     <Link to={`/recipes/${recipe._id}`}>

                          // <p>{recipe.name}</p>
                          //     </Link>
                          // <p style={{marginBottom:0}}>{recipe.likes}</p>

                          <div className="row mt-2 pt-2 pb-2 border border-primary rounded ">
                            <div className="col-md-4">
                              <h5 className="card-title">{recipe.name}</h5>
                            </div>
                            <div className="col-md-4">
                              <Mutation
                                mutation={DELETE_USER_RECIPE}
                                variables={{ _id: recipe._id }}
                                refetchQueries={() => [
                                  { query: GET_ALL_RECIPES },
                                  { query: GET_CURRENT_USER },
                                ]}
                                update={(
                                  cache,
                                  { data: { deleteUserRecipe } }
                                ) => {
                                  const { getUserRecipes } = cache.readQuery({
                                    query: GET_USER_RECIPES,
                                    variables: { username },
                                  });
                                  cache.writeQuery({
                                    query: GET_USER_RECIPES,
                                    variables: { username },
                                    data: {
                                      getUserRecipes: getUserRecipes.filter(
                                        (recipe) =>
                                          recipe._id !== deleteUserRecipe._id
                                      ),
                                    },
                                  });
                                }}
                              >
                                {(deleteUserRecipe, attrs = {}) => {
                                  return (
                                    <button
                                      className="btn btn-danger float-left"
                                      onClick={() =>
                                        handleDelete(deleteUserRecipe)
                                      }
                                    >
                                      delete
                                    </button>
                                  );
                                }}
                              </Mutation>
                            </div>
                            <div className="col-md-4">
                              <button className="btn btn-warning">
                                Update
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  );
                }}
              </Query>
            );
          }}
        </Query>
      </div>
    </React.Fragment>
  );
};

export default UserRecipes;
