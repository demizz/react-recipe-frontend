import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';
import Spinner from '../Spinner';

import LikeRecipe from '../LikeRecipe';
import Error from '../Error';
import { Link } from 'react-router-dom';

const RecipePage = ({ match }) => {
  console.log(match.params);
  const _id = match.params.id;
  console.log(_id);

  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <Error error={error.message} />;

        return (
          <div className="App">
            <div
              className="recipe-image"
              style={{
                background: `url(${data.getRecipe.imageUrl})center center /cover no-repeat `,
              }}
            ></div>
            <div className="recipe">
              <div className="recipe-header">
                <h2 className="recipe-name">
                  <strong>{data.getRecipe.name}</strong>
                </h2>
                <h5>
                  <strong>{data.getRecipe.category}</strong>
                </h5>
                <p>
                  Created by <strong>{data.getRecipe.createdBy}</strong>
                </p>
                <div className="row">
                  <div className="col-md-2 offset-md-4">
                    <p>
                      {data.getRecipe.likes}{' '}
                      <span role="img" aria-label="heart">
                        {' '}
                        ❤️
                      </span>{' '}
                    </p>
                  </div>
                  <div className="col-md-2 ">
                    <LikeRecipe id={data.getRecipe._id} />
                  </div>
                </div>
              </div>
              <blockquote className="recipe-description">
                {data.getRecipe.description}
              </blockquote>
              <h3 className="recipe instructions__title">Instructions</h3>
              <div
                className="recipe-instructions"
                dangerouslySetInnerHTML={{
                  __html: data.getRecipe.instructions,
                }}
              ></div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
