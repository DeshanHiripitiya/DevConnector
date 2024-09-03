import React, {  useState } from 'react';
import { Link,Navigate } from 'react-router-dom'; //Purpose: The Link component is used to create navigational links in your application. It's similar to the HTML <a> tag but provides enhanced functionality suited for single-page applications (SPAs).
//Purpose: The Navigate component is used to programmatically navigate to a different route. This can be useful for redirecting users under certain conditions, such as after form submission or authentication.
import { connect } from 'react-redux'; //function is used to connect the React component to the Redux store. It allows the component to access the state and dispatch actions
import PropTypes from 'prop-types';  //This library is used for type checking the props that are passed to a component. It helps ensure that components receive the correct type of props and can catch errors during development.
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated
 }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //e.target.name refers to the name attribute of the input field that triggered the change event.e.target.value refers to the current value of that input field.

  const onSubmit = async (e) => {
    e.preventDefault(); //When a form is submitted, the default action is to send a request to the server and reload the page. Using e.preventDefault(); in a form submission handler prevents this default behavior, allowing you to handle the form submission with JavaScript instead
    // register({ name, email, password });
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='register'>Sign Up</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  //PropTypes is a type-checking library for React props. It helps catch bugs by validating the types of props passed to a component.
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  // select the part of the data from the Redux store that the connected component needs. It is called every time the store state changes. It receives the entire store state and should return an object of data this component needs.
  // The current state of the Redux store.
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
