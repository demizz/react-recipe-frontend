import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { ADD_RECIPE, GET_ALL_RECIPES } from '../../queries';
import { withRouter } from 'react-router-dom';
import WithAuth from '../WithAuth';
import CKeditor from 'react-ckeditor-component';

const AddRecipe = (props) => {
  const [inputsValues, setInputsValues] = useState({
    name: '',
    description: '',
    instructions: '',
    category: 'Breakfast',
    username: '',
    imageUrl: '',
  });
  const {
    name,
    imageUrl,
    description,
    instructions,
    category,
    username,
  } = inputsValues;
  const clearState = () => {
    setInputsValues({
      ...inputsValues,
      name: '',
      description: '',
      instructions: '',
      category: 'Breakfast',
      username: '',
    });
  };
  const handleChange = (name) => (e) => {
    setInputsValues({ ...inputsValues, [name]: e.target.value });
  };
  const handleInstructionsChange = (e) => {
    const newContent = e.editor.getData();
    setInputsValues({ ...inputsValues, instructions: newContent });
  };
  const handleSubmit = (addRecipe) => (e) => {
    e.preventDefault();
    addRecipe().then(({ data }) => {
      console.log(data);
      clearState();
      props.history.push('/');
    });
  };
  const updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes],
      },
    });
  };
  const inValidForm = () => {
    const isInvalid =
      !name || !imageUrl || !description || !instructions || !category;
    return isInvalid;
  };
  return (
    <Mutation
      mutation={ADD_RECIPE}
      refetchQueries={() => [{ query: GET_ALL_RECIPES }]}
      update={updateCache}
      variables={{
        name,
        imageUrl,
        category,
        description,
        instructions,
        username,
      }}
    >
      {(addRecipe, { data, loading, error }) => {
        return (
          <div className="container">
            <div className="col-md-8 offset-md-2">
              <div className="text-center text-primary pb-4 pt-4">
                <h2>Add Recipe</h2>
              </div>
              <form className="form-group" onSubmit={handleSubmit(addRecipe)}>
                <input
                  type="text"
                  required
                  className="form-control mb-4"
                  name="name"
                  placeholder="Recipe Name"
                  value={name}
                  onChange={handleChange('name')}
                  id=""
                />
                <input
                  type="text"
                  required
                  className="form-control mb-4"
                  name="image"
                  placeholder="Recipe Image"
                  value={imageUrl}
                  onChange={handleChange('imageUrl')}
                  id=""
                />

                <select
                  name="category"
                  required
                  className="form-control mb-4"
                  value={category}
                  onChange={handleChange('category')}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input
                  type="text"
                  name="description"
                  required
                  className="form-control mb-4"
                  onChange={handleChange('description')}
                  value={description}
                  placeholder="Add description"
                  id=""
                />
                <label htmlFor="instructions">
                  Instructions
                  <CKeditor
                    name="instructions"
                    content={instructions}
                    events={{ change: handleInstructionsChange }}
                  />
                </label>
                {/* <textarea
                  name="instructions"
                  id=""
                  required
                  className="form-control mb-4"
                  onChange={handleChange('instructions')}
                  value={instructions}
                  placeholder="add Instructions"
                  cols="30"
                  rows="10"
                ></textarea> */}
                <button
                  disabled={loading || inValidForm()}
                  type="submit"
                  className="btn  btn-primary btn-lg btn-block"
                >
                  Submit
                </button>
                {error && <Error error={error.message} />}
              </form>
            </div>
          </div>
        );
      }}
    </Mutation>
  );
};

export default withRouter(AddRecipe);
