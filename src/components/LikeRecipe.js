import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { Query } from 'react-apollo';
import {
  LIKE_RECIPE,
  GET_RECIPE,
  UNLIKE_RECIPE,
  GET_CURRENT_USER,
} from '../queries';
import { FaGratipay } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Error from './Error';
const LikeRecipe = (props) => {
  const [likeThisRecipe, setLikeThisRecipe] = useState(false);

  const handleLike = (likeRecipe, unlikeRecipe, refetch) => {
    if (!likeThisRecipe) {
      likeRecipe().then(async ({ data }) => {
        setLikeThisRecipe((prev) => !prev);
      });
    } else {
      unlikeRecipe().then(async ({ data }) => {
        setLikeThisRecipe((prev) => !prev);
      });
    }
  };
  const updateLike = (cache, { data: { likeRecipe } }) => {
    const { id } = props;
    console.log({ id });
    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id: id },
    });
    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id: id },
      data: {
        getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 },
      },
    });
  };
  const updateUnlike = (cache, { data: { unlikeRecipe } }) => {
    const { id } = props;
    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id: id },
    });
    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id: id },
      data: {
        getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 },
      },
    });
  };
  return (
    <React.Fragment>
      <Query query={GET_CURRENT_USER}>
        {({ data, loading, error, refetch }) => {
          if (error) return <Error error={error.message} />;

          const username = data.getCurrentUser.username;

          return (
            <Mutation
              mutation={UNLIKE_RECIPE}
              update={updateUnlike}
              variables={{ _id: props.id, username }}
            >
              {(unlikeRecipe) => {
                return (
                  <Mutation
                    mutation={LIKE_RECIPE}
                    variables={{ _id: props.id, username }}
                    update={updateLike}
                  >
                    {(LikeRecipe) => {
                      return (
                        username && (
                          <IconContext.Provider
                            value={
                              likeThisRecipe
                                ? {
                                    color: 'red',
                                    className: 'global-class-name',
                                    size: '2.5rem',
                                  }
                                : {
                                    color: 'black',
                                    className: 'global-class-name',
                                    size: '1.5rem',
                                  }
                            }
                          >
                            <div
                              onClick={() =>
                                handleLike(LikeRecipe, unlikeRecipe, refetch)
                              }
                              style={{ cursor: 'pointer' }}
                              className="float-right"
                            >
                              <FaGratipay />
                            </div>
                          </IconContext.Provider>
                        )
                      );
                    }}
                  </Mutation>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default LikeRecipe;
