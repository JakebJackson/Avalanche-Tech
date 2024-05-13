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
    <section className="container mt-4 p-5 bg-text-dark border border-sky-blue border-4 rounded-5 shadow text-l-blue">
    <div className="container">
      <form onSubmit={handleFormSubmit}>
      <div class="mb-3">
          <label for="firstNameSingup" class="form-label">
            Enter your first name:
          </label>
          <input
            type="password"
            class="form-control"
            id="firstNameSingup"
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="lastNameSingup" class="form-label">
            Enter your last name:
          </label>
          <input
            type="password"
            class="form-control"
            id="lastNameSingup"
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="emailSignup" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="emailSignup"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="passwordSignup" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="passwordSignup"
            onChange={handleChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>

      <Link to="/login">Already have an account? Log-in here instead</Link>
    </div>
    </section>
  );
}

export default Signup;