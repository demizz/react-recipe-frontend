import React from 'react';
import RecipeItem from './Recipe/RecipeItem';
import './App.css';
import { GET_ALL_RECIPES } from '../queries';
import { Query } from 'react-apollo';
import Spinner from './Spinner';

function App() {
  return (
    <div className="App">
      <h1 className="main-title">
        Find Recipes you <strong>Love</strong>
      </h1>

      <Query query={GET_ALL_RECIPES}>
        {({ loading, data, error }) => {
          if (loading) {
            return <Spinner />;
          }
          if (error) {
            return <div>Error{error}</div>;
          }
          console.log(data);

          return (
            <ul className="cards">
              {data.getAllRecipes.map((recipe) => {
                return <RecipeItem key={recipe._id} {...recipe} />;
              })}
            </ul>
          );
        }}
      </Query>
    </div>
  );
}

export default App;
