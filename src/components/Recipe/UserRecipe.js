import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import { EDIT_RECIPE } from '../../queries';

const UserRecipe = ({ data, id }) => {
  const history = useHistory();
  console.log(data);
  console.log(id);
  const [inputsValues, setInputsValues] = useState({
    _id: id,
    name: data.name,
    description: data.description,

    category: data.category,

    imageUrl: data.imageUrl,
  });
  const {
    _id,
    name,
    imageUrl,
    description,

    category,
  } = inputsValues;

  const handleChange = (name) => (e) => {
    setInputsValues({ ...inputsValues, [name]: e.target.value });
  };
  const handleSubmit = (editRecipe) => (event) => {
    event.preventDefault();
    editRecipe().then((data) => {
      console.log(data);
      history.push('/');
    });
  };

  return (
    <Mutation
      mutation={EDIT_RECIPE}
      variables={{ name, category, description, imageUrl, _id }}
    >
      {(editRecipe) => {
        return (
          <div className="row mt-5">
            <div className="col-md-8 offset-md-2">
              <h4>Edit Recipe</h4>
              <form className="form-group" onSubmit={handleSubmit(editRecipe)}>
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
                <hr />
                <div className="modal-buttons">
                  <button type="submit" className="button-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </Mutation>
  );
};

export default UserRecipe;
