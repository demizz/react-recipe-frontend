import { gql } from 'apollo-boost';
export const recipeFragment = {
  recipe: gql`
    fragment CompleteRecipe on Recipe {
      _id
      name
      category
      description

      instructions
      createDate
      likes
      username
    }
    }
    `,
  like: gql`
    fragment likeRecipe onRecipe{
        _id 
        likes
    }
    `,
};
