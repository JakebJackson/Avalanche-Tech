import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
          <label htmlFor="firstNameSingup" className="form-label">
            Enter your first name:
          </label>
          <input
            name="firstName"
            type="firstName"
            className="form-control"
            id="firstNameSingup"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastNameSingup" className="form-label">
            Enter your last name:
          </label>
          <input
            name="lastName"
            type="lastName"
            className="form-control"
            id="lastNameSingup"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailSignup" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="emailSignup"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text text-light">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordSignup" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="passwordSignup"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <Link to="/login">Already have an account? Log-in here instead</Link>
    </div>
    </section>
  );
}

export default Signup;