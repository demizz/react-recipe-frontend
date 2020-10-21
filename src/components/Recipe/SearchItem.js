import React from 'react';
import { Link } from 'react-router-dom';
const SearchItem = ({ recipe }) => {
  return (
    <div
      className="row border border-black rounded mt-2 mb-2"
      style={{
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <div
        className="col-md-4 text-danger"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Link to={`/recipes/${recipe._id}`}>
          <h4>{recipe.name}</h4>
        </Link>
      </div>
      <div
        className="col-md-4"
        // style={{
        //   display: 'flex',
        //   alignItems: 'center',
        //   alignContent: 'center',
        // }}
      >
        <p> {recipe.likes} &nbsp; likes &nbsp;</p>
      </div>
      <div
        className="col-md-4"
        // style={{
        //   display: 'flex',
        //   alignItems: 'center',
        //   alignContent: 'center',
        // }}
      >
        <button className="btn btn-warning"> {recipe.category} </button>
      </div>
    </div>
  );
};

export default SearchItem;
