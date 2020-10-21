import { gql } from 'apollo-boost';

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      imageUrl

      category
    }
  }
`;
export const SEARCH_RECPIES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      likes
      category
    }
  }
`;
export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      imageUrl
      category
      description
      instructions
      createdDate
      likes
      createdBy
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
export const ADD_RECIPE = gql`
  mutation(
    $name: String!
    $imageUrl: String!
    $description: String!
    $category: String!
    $instructions: String!
    $username: String
  ) {
    addRecipe(
      name: $name
      imageUrl: $imageUrl
      description: $description
      category: $category
      instructions: $instructions
      username: $username
    ) {
      _id
      name
      category
      imageUrl
      description
      instructions
      createdDate
      likes
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        _id
        name
      }
    }
  }
`;
export const GET_USER_RECIPES = gql`
  query($username: String!) {
    getUserRecipes(username: $username) {
      _id
      name
      likes
      imageUrl
    }
  }
`;
export const LIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    likeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;
export const UNLIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;
export const DELETE_USER_RECIPE = gql`
  mutation($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;
