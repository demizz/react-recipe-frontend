import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/Navbar';
import RecipePage from './components/Recipe/RecipePage';
import Search from './components/Recipe/Search';
import Profile from './components/User/Profile';
import AddRecipe from './components/Recipe/AddRecipe';
import App from './components/App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import WithSessions from './components/WithSessions';
import WithAuth from './components/WithAuth';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('network Error', networkError);
      if (networkError.statusCode === 401) {
        localStorage.removeItem('token');
      }
    }
  },
});

const Root = ({ refetch, session }) => (
  <Router>
    <React.Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={App} />
        <Route path="/recipe/add" exact component={WithAuth(AddRecipe)} />

        <Route path="/search" exact component={Search} />

        <Route path="/recipes/:id" exact component={WithAuth(RecipePage)} />

        <Route path="/login" render={() => <Login refetch={refetch} />} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  </Router>
);
const RootWithSession = WithSessions(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);
