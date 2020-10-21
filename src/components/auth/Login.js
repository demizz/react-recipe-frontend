import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN_USER } from '../../queries/index';
import Error from '../Error';
import { withRouter } from 'react-router-dom';
const Login = (props) => {
  console.log({ props });
  const [inputs, setInputs] = useState({
    username: '',

    password: '',
  });
  const { username, password } = inputs;
  const handleChange = (name) => (e) => {
    setInputs({ ...inputs, [name]: e.target.value });
  };
  const clearState = () => {
    setInputs({ ...inputs, username: '', password: '' });
  };
  const handleSubmit = (loginUser) => (e) => {
    e.preventDefault();

    loginUser().then(async ({ data }) => {
      localStorage.setItem('token', data.loginUser.token);
      await props.refetch();
      clearState();
      props.history.push('/');
    });
  };
  const validateForm = () => {
    const isInvalid = !username || !password;
    return isInvalid;
  };
  return (
    <div className="container">
      <div className="text-center text-primary pb-4 pt-4">
        <h2>Login</h2>
      </div>
      <Mutation mutation={LOGIN_USER} variables={{ username, password }}>
        {(loginUser, { data, error, loading }) => {
          return (
            <form
              action=""
              className="form-group"
              onSubmit={handleSubmit(loginUser)}
            >
              <input
                type="text"
                required
                className="form-control mb-4"
                name="Type your Username"
                value={username}
                onChange={handleChange('username')}
                placeholder="Username"
                id=""
              />
              <input
                type="password"
                required
                className="form-control mb-4"
                name="password"
                placeholder="Type your password"
                id=""
                value={password}
                onChange={handleChange('password')}
              />
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                disabled={loading || validateForm()}
              >
                {' '}
                Submit
              </button>
              {error && <Error error={error.message} />}
            </form>
          );
        }}
      </Mutation>
    </div>
  );
};

export default withRouter(Login);
