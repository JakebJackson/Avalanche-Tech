import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section className="container mt-4 p-5 bg-dark border border-sky-blue border-4 rounded-5 shadow text-white">
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="emailLogin" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="emailLogin"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordLogin" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="passwordLogin"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="text-danger">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <Link to="/signup">Don't have an account? Sign-up here instead.</Link>
    </div>
    </section>
  );
}

export default Login;